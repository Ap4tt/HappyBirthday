(function () {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || '';
  const day = Number(params.get('day'));
  const month = Number(params.get('month'));
  const urlLang = params.get('lang');

  const pageType = document.body.getAttribute('data-page'); 
  let currentLang = urlLang === 'en' ? 'en' : 'id';

  const langButtons = document.querySelectorAll('.lang-toggle-btn');

  const msgPart1 = document.getElementById('msgPart1');
  const msgName = document.getElementById('msgName');
  const msgPart2 = document.getElementById('msgPart2');
  const msgDate = document.getElementById('msgDate');
  const msgPart3 = document.getElementById('msgPart3');

  const labelDays = document.getElementById('cdDaysLabel');
  const labelHours = document.getElementById('cdHoursLabel');
  const labelMinutes = document.getElementById('cdMinutesLabel');
  const labelSeconds = document.getElementById('cdSecondsLabel');

  const valDays = document.getElementById('cdDays');
  const valHours = document.getElementById('cdHours');
  const valMinutes = document.getElementById('cdMinutes');
  const valSeconds = document.getElementById('cdSeconds');

  let targetDate = null;

  // Khusus 29 Februari: dicariin tahun kabisat berikutnya yang
  // beneran punya tanggal itu (bisa beberapa tahun ke depan),
  // BUKAN di-treat jadi 28 Februari.
  function isLeapYear(y) {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  }

  function getNextOccurrence(day, month, now) {
    const year = now.getFullYear();

    if (month === 2 && day === 29) {
      let y = year;
      while (true) {
        if (isLeapYear(y)) {
          const candidate = new Date(y, 1, 29, 0, 0, 0, 0);
          if (candidate > now) return candidate;
        }
        y += 1;
      }
    }

    let candidate = new Date(year, month - 1, day, 0, 0, 0, 0);
    if (candidate <= now) {
      candidate = new Date(year + 1, month - 1, day, 0, 0, 0, 0);
    }
    return candidate;
  }

  function formatDate(date, lang) {
    const monthName = I18N[lang].months[date.getMonth()];
    return lang === 'en'
      ? monthName + ' ' + date.getDate()
      : date.getDate() + ' ' + monthName;
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tickValue(el, newText) {
    if (el.textContent === newText) return;
    el.textContent = newText;
    el.classList.remove('is-ticking');
    void el.offsetWidth; 
    el.classList.add('is-ticking');
  }

  // ---------------------------------------------------------
  // Bahasa
  // ---------------------------------------------------------
  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'id';
    const dict = I18N[currentLang];
    const msg = pageType === 'too-late' ? dict.tooLate : dict.tooEarly;

    document.title = pageType === 'too-late' ? dict.tooLateTitle : dict.tooEarlyTitle;
    document.documentElement.lang = currentLang;

    msgPart1.textContent = msg.part1;
    msgName.textContent = name ? ', ' + name : '';
    msgPart2.textContent = msg.part2;
    msgPart3.textContent = msg.part3;

    labelDays.textContent = dict.countdownDays;
    labelHours.textContent = dict.countdownHours;
    labelMinutes.textContent = dict.countdownMinutes;
    labelSeconds.textContent = dict.countdownSeconds;

    if (targetDate) {
      msgDate.textContent = formatDate(targetDate, currentLang);
    }

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

  // ---------------------------------------------------------
  // Countdown loop
  // ---------------------------------------------------------
  function tick() {
    const now = new Date();

    if (!targetDate || targetDate <= now) {
      targetDate = getNextOccurrence(day, month, now);
      msgDate.textContent = formatDate(targetDate, currentLang);
    }

    let diff = Math.max(0, targetDate - now);
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000); diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);

    tickValue(valDays, pad(days));
    tickValue(valHours, pad(hours));
    tickValue(valMinutes, pad(minutes));
    tickValue(valSeconds, pad(seconds));
  }

  applyLanguage(currentLang);

  if (day && month) {
    tick();
    setInterval(tick, 1000);
  }
})();
