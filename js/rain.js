(function () {
  const RAIN_SRCS = ['images/Flower1.png', 'images/Flower2.png', 'images/Heart1.png', 'images/Heart2.png'];
  const RAIN_COUNT = window.innerWidth <= 640 ? 22 : 30;
  const OPEN_DURATION = 420; // ms, harus match .wish-box.is-opening di CSS
  const CLOSE_DURATION = 320; // ms, harus match .wish-box.is-closing di CSS

  const layer = document.getElementById('rainLayer');
  const wishOverlay = document.getElementById('wishOverlay');
  const wishBox = document.getElementById('wishBox');
  const wishClose = document.getElementById('wishClose');
  const wishTitleEl = document.getElementById('wishTitle');
  const wishParagraphsEl = document.getElementById('wishParagraphs');
  const rainHintText = document.getElementById('rainHintText');
  const rainHint = document.getElementById('rainHint');
  const blurWrapper = document.getElementById('blurWrapper');

  if (!layer || !wishOverlay || !wishBox) return;

  let currentWishIndex = null;
  let isOpen = false;
  let isAnimating = false;
  let rainHintClickCount = 0;

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function currentLang() {
    return document.documentElement.lang === 'en' ? 'en' : 'id';
  }

  function renderRainHint() {
    if (!rainHintText) return;
    const lang = currentLang();
    rainHintText.textContent = rainHintClickCount === 0
    ? I18N[lang].rainHint
    : I18N[lang].rainHint2;
  }

  renderRainHint();

  // Render ulang teks ucapan pakai currentWishIndex yang UDAH ADA,
  // cuma ganti sumber bahasanya (WISHES.id / WISHES.en). Ucapannya
  // sendiri gak ikut ganti, cuma diterjemahin.
  function renderWishText() {
    const lang = currentLang();
    const list = WISHES[lang];

    if (currentWishIndex === null || currentWishIndex >= list.length) {
      currentWishIndex = Math.floor(Math.random() * list.length);
    }

    const wish = list[currentWishIndex];
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || I18N[lang].defaultName;

    wishTitleEl.textContent = I18N[lang].wishTitle;
    wishParagraphsEl.innerHTML = '';
    wish.paragraphs.forEach(function (p) {
      const el = document.createElement('p');
      el.textContent = p.replace(/\{name\}/g, name);
      wishParagraphsEl.appendChild(el);
    });
  }

  // Pilih ucapan BARU secara random (index berubah), lalu render.
  // Ini yang dipanggil tiap kali tetesan hujan diklik, biar tiap
  // klik selalu dapet ucapan yang beda dari sebelumnya.
  function pickNewWish() {
    const lang = currentLang();
    const list = WISHES[lang];

    if (list.length > 1) {
      let next;
      do {
        next = Math.floor(Math.random() * list.length);
      } while (next === currentWishIndex);
      currentWishIndex = next;
    } else {
      currentWishIndex = 0;
    }

    renderWishText();
  }

  // Set transform-origin si wish-box supaya animasi scale-nya
  // seolah muncul/kesedot dari titik (px, py) di layar (viewport
  // coords, misal dari event.clientX/clientY). Caranya: ambil
  // posisi & ukuran wish-box ASLI (posisi center normalnya, belum
  // di-scale), terus hitung offset titik target relatif ke box
  // itu — offset ini boleh di luar 0-100%, itu justru yang bikin
  // pivot animasinya "keluar" dari box menuju titik di luar box.
  function setTransformOriginToPoint(px, py) {
    const rect = wishBox.getBoundingClientRect();
    const originX = px - rect.left;
    const originY = py - rect.top;
    wishBox.style.transformOrigin = originX + 'px ' + originY + 'px';
  }

  function getCloseButtonPoint() {
    const rect = wishClose.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  function openWish(originX, originY) {
    rainHintClickCount++;
    if (rainHintClickCount === 1) {
      renderRainHint(); // klik ke-1: ganti teksnya
    } else if (rainHintClickCount >= 2) {
      if (rainHint) rainHint.classList.add('is-hidden'); // klik ke-2 dst: baru ilang
    }
    // Kalau card udah kebuka (atau lagi dalam proses buka/tutup),
    // abaikan klik hujan lain — jangan reset ke ucapan/posisi baru
    // sampai user nutup card yang lagi tampil dulu.
    
    if (isOpen || isAnimating) return;
    isAnimating = true;

    pickNewWish();

    wishOverlay.hidden = false;
    blurWrapper.classList.add('is-blurred');
    layer.style.pointerEvents = 'none'; // safety net kedua, selain blur-wrapper.is-blurred
    wishClose.classList.add('is-visible');
    isOpen = true;

    // Overlay baru aja di-unhide, wish-box sekarang punya posisi &
    // ukuran normalnya (center layar) — baru dari sini transform-origin
    // dihitung dengan benar.
    if (typeof originX === 'number' && typeof originY === 'number') {
      setTransformOriginToPoint(originX, originY);
    } else {
      wishBox.style.transformOrigin = '50% 50%';
    }

    wishBox.classList.remove('is-closing');
    // Force reflow biar animasi 'is-opening' ke-restart bersih
    // walau sebelumnya sempet ke-trigger (misal buka-tutup cepat).
    void wishBox.offsetWidth;
    wishBox.classList.add('is-opening');

    window.setTimeout(function () {
      wishBox.classList.remove('is-opening');
      isAnimating = false;
    }, OPEN_DURATION);
  }

  function closeWish() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const target = getCloseButtonPoint();
    setTransformOriginToPoint(target.x, target.y);

    wishBox.classList.remove('is-opening');
    void wishBox.offsetWidth;
    wishBox.classList.add('is-closing');

    blurWrapper.classList.remove('is-blurred');
    wishClose.classList.remove('is-visible');

    window.setTimeout(function () {
      wishBox.classList.remove('is-closing');
      wishOverlay.hidden = true;
      layer.style.pointerEvents = ''; // balikin rain-item bisa diklik lagi
      isOpen = false;
      isAnimating = false;
    }, CLOSE_DURATION);
  }

  wishClose.addEventListener('click', closeWish);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closeWish();
  });

  // Kalau lagi kebuka terus bahasa ditoggle, ikut update teksnya
  // (jangan random ulang, cuma translate wish yang sama).
  document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
    renderRainHint();
      if (isOpen) {
        setTimeout(renderWishText, 0);
      }
    });
  });

  // ---------------------------------------------------------
  // Generate item hujan yang jatuh terus-menerus
  // ---------------------------------------------------------
  for (let i = 0; i < RAIN_COUNT; i++) {
    const el = document.createElement('img');
    el.src = pick(RAIN_SRCS);
    el.alt = '';
    el.className = 'rain-item';

    const isMobile = window.innerWidth <= 640;
    const size = isMobile ? (22 + Math.random() * 22) : (26 + Math.random() * 28);
    const left = Math.random() * 100;
    const duration = isMobile ? (7 + Math.random() * 8) : (5 + Math.random() * 10);
    const delay = Math.random() * +duration; 
    const sway = isMobile ? (4 + Math.random() * 5) : (18 + Math.random() * 36);
    const rot = isMobile ? (Math.random() * 8 - 4) : (Math.random() * 26 - 13);
    const opacity = 0.6 + Math.random() * 0.35;

    el.style.width = size + 'px';
    el.style.left = left + '%';
    el.style.opacity = opacity.toFixed(2);
    el.style.animationDuration = duration.toFixed(2) + 's';
    el.style.animationDelay = delay.toFixed(2) + 's';
    el.style.setProperty('--sway', sway.toFixed(0) + 'px');
    el.style.setProperty('--rot', rot.toFixed(1) + 'deg');

    el.addEventListener('click', function (e) {
      e.stopPropagation();
      openWish(e.clientX, e.clientY);
    });

    // Tiap kali 1 putaran jatuh kelar (animasi loop balik ke 0%),
    // re-random posisi horizontal (+ sway/rotasi) biar gak keliatan
    // "jalur yang itu-itu aja" tiap kali. Momen loop ini udah otomatis
    // ada loncatan visual (dari bawah balik ke atas), jadi ganti
    // posisi di titik yang sama gak nambah jump yang keliatan aneh.
    el.addEventListener('animationiteration', function () {
      const newLeft = Math.random() * 100;
      const newSway = 18 + Math.random() * 36;
      const newRot = Math.random() * 26 - 13;

      el.style.left = newLeft + '%';
      el.style.setProperty('--sway', newSway.toFixed(0) + 'px');
      el.style.setProperty('--rot', newRot.toFixed(1) + 'deg');
    });

    layer.appendChild(el);
  }
})();
