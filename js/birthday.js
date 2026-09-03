(function () {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || '';
  const year = Number(params.get('year'));
  const urlLang = params.get('lang');
  let currentLang = urlLang === 'en' ? 'en' : 'id';

  const langButtons = document.querySelectorAll('.lang-toggle-btn');
  const helloEl = document.getElementById('bdayHello');
  const nameEl = document.getElementById('bdayName');
  const ageLineEl = document.getElementById('bdayAgeLine');

  const today = new Date();
  const age = year ? today.getFullYear() - year : null;

  // ---- Font nama, ganti tiap detik ----
  const NAME_FONTS = [
    "'Press Start 2P'",
    "'Playwrite BR Guides'",
    "'Akronim'",
    "'Black Ops One'",
    "'Lobster Two'",
    "'Fontdiner Swanky'",
    "'Dancing Script'",
    "'Pacifico'"
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function renderAgeLine() {
    const phrases = AGE_PHRASES[currentLang];
    const template = pick(phrases);
    ageLineEl.textContent = template.replace('{age}', age != null ? age : '?');
  }

  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'id';
    const dict = I18N[currentLang];

    document.title = dict.birthdayTitle;
    document.documentElement.lang = currentLang;

    helloEl.textContent = dict.hello;
    nameEl.textContent = name || dict.defaultName;

    renderAgeLine();

    langButtons.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === currentLang);
    });

    const url = new URL(window.location.href);
    url.searchParams.set('lang', currentLang);
    window.history.replaceState({}, '', url);
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang'));
    });
  });

  // ---- Cycle font nama tiap 1 detik ----
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let fontIndex = 0;
  nameEl.style.fontFamily = NAME_FONTS[fontIndex];

  if (!prefersReducedMotion) {
    setInterval(function () {
      fontIndex = (fontIndex + 1) % NAME_FONTS.length;
      nameEl.style.fontFamily = NAME_FONTS[fontIndex];
    }, 275);
  }

  applyLanguage(currentLang);
})();
