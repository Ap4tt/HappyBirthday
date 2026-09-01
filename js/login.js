(function () {
  const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const CURRENT_YEAR = new Date().getFullYear();
  const YEAR_RANGE = 100; 

  const dayOptions = Array.from({ length: 31 }, function (_, i) {
    const n = String(i + 1);
    return { value: n, label: n };
  });

  const yearOptions = Array.from({ length: YEAR_RANGE }, function (_, i) {
    const y = String(CURRENT_YEAR - i);
    return { value: y, label: y };
  });

  function getMonthOptions(lang) {
    return I18N[lang].months.map(function (name, i) {
      return { value: String(i + 1), label: name };
    });
  }

  function isLeapYear(y) {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  }

  function classifyToday(day, month, now) {
    const todayMonth = now.getMonth() + 1;
    const todayDay = now.getDate();

    if (month === 2 && day === 29) {
      const thisYear = now.getFullYear();
      if (!isLeapYear(thisYear)) return 'early'; 
      if (todayMonth === 2 && todayDay === 29) return 'exact';
      const thisYearFeb29 = new Date(thisYear, 1, 29, 0, 0, 0, 0);
      return now < thisYearFeb29 ? 'early' : 'late';
    }

    if (todayMonth === month && todayDay === day) return 'exact';
    if (todayMonth < month || (todayMonth === month && todayDay < day)) return 'early';
    return 'late';
  }

  // ---------------------------------------------------------
  // Elemen & state bahasa
  // ---------------------------------------------------------
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  let currentLang = urlLang === 'en' ? 'en' : 'id';

  const langButtons = document.querySelectorAll('.lang-toggle-btn');

  const form = document.getElementById('loginForm');
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  const birthdateError = document.getElementById('birthdateError');

  const dayHidden = document.getElementById('birthDay');
  const monthHidden = document.getElementById('birthMonth');
  const yearHidden = document.getElementById('birthYear');

  const dayDD = document.querySelector('.pixel-dropdown[data-name="day"]');
  const monthDD = document.querySelector('.pixel-dropdown[data-name="month"]');
  const yearDD = document.querySelector('.pixel-dropdown[data-name="year"]');

  const allDropdowns = [dayDD, monthDD, yearDD];
  let openDropdown = null;

  // ---------------------------------------------------------
  // Custom dropdown widget ("drip cream" style)
  // ---------------------------------------------------------
  function closeDropdown(dd) {
    dd.classList.remove('is-open', 'drops-up');
    dd.querySelector('.dropdown-trigger').setAttribute('aria-expanded', 'false');
    dd.querySelector('.dropdown-panel').hidden = true;
    if (openDropdown === dd) openDropdown = null;
  }

  function openDropdownEl(dd) {
    if (openDropdown && openDropdown !== dd) closeDropdown(openDropdown);

    const trigger = dd.querySelector('.dropdown-trigger');
    const panel = dd.querySelector('.dropdown-panel');

    panel.hidden = false;
    dd.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    openDropdown = dd;

    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const panelHeight = panel.offsetHeight;

    if (spaceBelow < panelHeight + 12 && spaceAbove > spaceBelow) {
      dd.classList.add('drops-up');
    }

    const current = panel.querySelector('.dropdown-option.is-selected');
    if (current) current.scrollIntoView({ block: 'nearest' });
  }

  function toggleDropdown(dd) {
    if (dd.classList.contains('is-open')) {
      closeDropdown(dd);
    } else {
      openDropdownEl(dd);
    }
  }

  function setActiveOption(items, index) {
    items.forEach(function (li) { li.classList.remove('is-active'); });
    const li = items[index];
    if (!li) return;
    li.classList.add('is-active');
    li.focus();
    li.scrollIntoView({ block: 'nearest' });
  }

  function buildDropdown(dd, options, hiddenInput) {
    const trigger = dd.querySelector('.dropdown-trigger');
    const valueEl = dd.querySelector('.dropdown-value');
    const list = dd.querySelector('.dropdown-list');

    dd.setAttribute('data-placeholder', 'true');

    options.forEach(function (opt) {
      const li = document.createElement('li');
      li.className = 'dropdown-option';
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');
      li.setAttribute('data-value', opt.value);
      li.tabIndex = -1;
      li.textContent = opt.label;
      list.appendChild(li);
    });

    function selectValue(value, label) {
      hiddenInput.value = value;
      valueEl.textContent = label;
      dd.setAttribute('data-placeholder', 'false');
      list.querySelectorAll('.dropdown-option').forEach(function (li) {
        const isMatch = li.getAttribute('data-value') === value;
        li.classList.toggle('is-selected', isMatch);
        li.setAttribute('aria-selected', String(isMatch));
      });
      trigger.classList.remove('has-error');
    }

    trigger.addEventListener('click', function () {
      toggleDropdown(dd);
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDropdownEl(dd);
        const items = Array.from(list.querySelectorAll('.dropdown-option'));
        const selectedIndex = items.findIndex(function (li) {
          return li.classList.contains('is-selected');
        });
        setActiveOption(items, selectedIndex >= 0 ? selectedIndex : 0);
      } else if (e.key === 'Escape') {
        closeDropdown(dd);
      }
    });

    list.addEventListener('click', function (e) {
      const li = e.target.closest('.dropdown-option');
      if (!li) return;
      selectValue(li.getAttribute('data-value'), li.textContent);
      closeDropdown(dd);
      trigger.focus();
    });

    list.addEventListener('keydown', function (e) {
      const items = Array.from(list.querySelectorAll('.dropdown-option'));
      const activeIndex = items.findIndex(function (li) {
        return li.classList.contains('is-active');
      });

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveOption(items, Math.min(items.length - 1, activeIndex + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveOption(items, Math.max(0, activeIndex - 1));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const li = items[activeIndex];
        if (li) {
          selectValue(li.getAttribute('data-value'), li.textContent);
          closeDropdown(dd);
          trigger.focus();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeDropdown(dd);
        trigger.focus();
      } else if (e.key === 'Tab') {
        closeDropdown(dd);
      }
    });
  }

  buildDropdown(dayDD, dayOptions, dayHidden);
  buildDropdown(monthDD, getMonthOptions(currentLang), monthHidden);
  buildDropdown(yearDD, yearOptions, yearHidden);

  document.addEventListener('click', function (e) {
    if (openDropdown && !openDropdown.contains(e.target)) {
      closeDropdown(openDropdown);
    }
  });

  window.addEventListener('resize', function () {
    if (openDropdown) closeDropdown(openDropdown);
  });

  // ---------------------------------------------------------
  // Bahasa: pasang teks & ganti nama bulan tanpa reload
  // ---------------------------------------------------------
  function updateDropdownPlaceholder(dd, text) {
    if (dd.getAttribute('data-placeholder') === 'true') {
      dd.querySelector('.dropdown-value').textContent = text;
    }
  }

  function updateMonthLabels(monthsArr) {
    const items = monthDD.querySelectorAll('.dropdown-option');
    items.forEach(function (li, idx) {
      li.textContent = monthsArr[idx];
    });
    if (monthDD.getAttribute('data-placeholder') === 'false') {
      const selectedIdx = Number(monthHidden.value) - 1;
      monthDD.querySelector('.dropdown-value').textContent = monthsArr[selectedIdx];
    }
  }

  function setLanguage(lang) {
    currentLang = (lang === 'en') ? 'en' : 'id';
    const dict = I18N[currentLang];

    document.title = dict.pageTitle;
    document.documentElement.lang = currentLang;

    document.getElementById('heading').textContent = dict.heading;
    document.getElementById('nameLabel').textContent = dict.nameLabel;
    nameInput.placeholder = dict.namePlaceholder;
    document.getElementById('birthdateLabel').textContent = dict.dateLabel;
    document.getElementById('submitBtnLabel').textContent = dict.submitBtn;

    // default text buat pesan error (baru keliatan pas divalidasi ulang)
    nameError.textContent = dict.nameError;
    birthdateError.textContent = dict.dateEmptyError;

    updateDropdownPlaceholder(dayDD, dict.dayPlaceholder);
    updateDropdownPlaceholder(monthDD, dict.monthPlaceholder);
    updateDropdownPlaceholder(yearDD, dict.yearPlaceholder);
    updateMonthLabels(dict.months);

    langButtons.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === currentLang);
    });

    const url = new URL(window.location.href);
    url.searchParams.set('lang', currentLang);
    window.history.replaceState({}, '', url);
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });

  setLanguage(currentLang); // pasang teks awal sesuai bahasa terdeteksi dari URL

  // ---------------------------------------------------------
  // Validasi form
  // ---------------------------------------------------------
  function shakeField(errorEl) {
    const field = errorEl.closest('.field');
    field.classList.remove('shake');
    void field.offsetWidth; // restart animasi walau error 2x berturut-turut
    field.classList.add('shake');
  }

  function showNameError(message) {
    nameError.textContent = message;
    nameError.classList.add('is-visible');
    nameInput.classList.add('has-error');
    shakeField(nameError);
  }

  function clearNameError() {
    nameError.classList.remove('is-visible');
    nameInput.classList.remove('has-error');
  }

  function showDateError(message) {
    birthdateError.textContent = message;
    birthdateError.classList.add('is-visible');
    allDropdowns.forEach(function (dd) {
      dd.querySelector('.dropdown-trigger').classList.add('has-error');
    });
    shakeField(birthdateError);
  }

  function clearDateError() {
    birthdateError.classList.remove('is-visible');
    allDropdowns.forEach(function (dd) {
      dd.querySelector('.dropdown-trigger').classList.remove('has-error');
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const dict = I18N[currentLang];
    let valid = true;
    const name = nameInput.value.trim();
    const day = dayHidden.value;
    const month = monthHidden.value;
    const year = yearHidden.value;

    if (!name) {
      showNameError(dict.nameError);
      valid = false;
    } else {
      clearNameError();
    }

    if (!day || !month || !year) {
      showDateError(dict.dateEmptyError);
      valid = false;
    } else if (Number(day) > DAYS_IN_MONTH[Number(month) - 1]) {
      showDateError(dict.dateInvalidError);
      valid = false;
    } else {
      clearDateError();
    }

    if (!valid) return;

    const query = '?name=' + encodeURIComponent(name) +
      '&day=' + day + '&month=' + month + '&year=' + year +
      '&lang=' + currentLang;

    const result = classifyToday(Number(day), Number(month), new Date());

    if (result === 'early') {
      window.location.href = 'too-early.html' + query;
    } else if (result === 'late') {
      window.location.href = 'too-late.html' + query;
    } else {
      window.location.href = 'envelope.html' + query;
    }
  });

  nameInput.addEventListener('input', clearNameError);
})();
