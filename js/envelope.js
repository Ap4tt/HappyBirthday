(function () {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  let currentLang = urlLang === 'en' ? 'en' : 'id';

  const langButtons = document.querySelectorAll('.lang-toggle-btn');
  const envelopeBtn = document.getElementById('envelopeBtn');
  const envelopeImg = document.getElementById('envelopeImg');
  const envelopeHint = document.getElementById('envelopeHint');
  const burstLayer = document.getElementById('burstLayer');

  let opened = false;

  // ---------------------------------------------------------
  // Bahasa
  // ---------------------------------------------------------
  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'id';
    const dict = I18N[currentLang];

    document.title = dict.envelopeTitle;
    document.documentElement.lang = currentLang;
    envelopeHint.textContent = dict.envelopeHint;

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

  applyLanguage(currentLang);

  envelopeBtn.addEventListener('click', function () {
    if (opened) return;
    opened = true;

    envelopeBtn.classList.add('is-open');
    envelopeImg.src = 'images/envelope-open.png';

    const rect = envelopeImg.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    setTimeout(function () {
      burstFlyOut(burstLayer, originX, originY, function () {
        const query = window.location.search;
        window.location.href = 'birthday.html' + query;
      });
    }, 400);
  });
})();
