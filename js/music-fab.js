(function () {
  const fabPanel = document.getElementById('fabPanel');
  const fabTrigger = document.getElementById('fabTrigger');
  const fabMenu = document.getElementById('fabMenu');
  const muteBtn = document.getElementById('muteBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const libraryBtn = document.getElementById('libraryBtn');
  const libraryPanel = document.getElementById('libraryPanel');
  const libraryList = document.getElementById('libraryList');
  const audio = document.getElementById('bgAudio');

  let menuOpen = false;
  let libraryOpen = false;
  let currentSongIndex = 0;

  function closeLibrary() {
    libraryOpen = false;
    libraryPanel.hidden = true;
    libraryBtn.classList.remove('is-active');
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
    fabMenu.setAttribute('aria-hidden', String(!menuOpen));
    fabTrigger.classList.toggle('is-open', menuOpen);
    fabTrigger.setAttribute('aria-expanded', String(menuOpen));
    fabPanel.classList.toggle('is-open', menuOpen);
    if (!menuOpen) closeLibrary();
  }

  fabTrigger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // ---------------------------------------------------------
  // Mute
  // ---------------------------------------------------------
  muteBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    audio.muted = !audio.muted;
    muteBtn.classList.toggle('is-active', audio.muted);
  });

  // ---------------------------------------------------------
  // Pause / lanjut play
  // ---------------------------------------------------------
  pauseBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (audio.paused) {
      audio.play().catch(function () {});
      pauseBtn.classList.remove('is-active');
    } else {
      audio.pause();
      pauseBtn.classList.add('is-active');
    }
  });

  // ---------------------------------------------------------
  // Library — expand ke samping + bawah
  // ---------------------------------------------------------
  libraryBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    libraryOpen = !libraryOpen;
    libraryPanel.hidden = !libraryOpen;
    libraryBtn.classList.toggle('is-active', libraryOpen);
  });

  libraryPanel.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  function renderLibrary() {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'id';
    libraryList.innerHTML = '';

    if (!window.SONGS || SONGS.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'library-empty';
      empty.textContent = I18N[lang].libraryEmpty;
      libraryList.appendChild(empty);
      return;
    }

    SONGS.forEach(function (song, index) {
      const li = document.createElement('li');
      li.className = 'library-item';
      li.textContent = song.title;
      li.addEventListener('click', function () {
        playSong(index);
      });
      libraryList.appendChild(li);
    });
    updateActiveSong();
  }

  function updateActiveSong() {
    const items = libraryList.querySelectorAll('.library-item');
    items.forEach(function (item, i) {
      item.classList.toggle('is-playing', i === currentSongIndex);
    });
  }

  function playSong(index) {
    if (!window.SONGS || !SONGS[index]) return;
    currentSongIndex = index;
    audio.src = SONGS[index].src;
    audio.muted = false;
    muteBtn.classList.remove('is-active');
    audio.play().catch(function () {});
    pauseBtn.classList.remove('is-active');
    updateActiveSong();
  }

  if (window.SONGS && SONGS.length > 0) {
  currentSongIndex = Math.floor(Math.random() * SONGS.length);
  }

  renderLibrary();

  let autoPausedByHide = false;

  function isManuallyPaused() {
    return pauseBtn.classList.contains('is-active');
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      if (!audio.paused) {
        audio.pause();
        autoPausedByHide = true;
      }
    } else {
      if (autoPausedByHide && !isManuallyPaused()) {
        audio.play().catch(function () {});
      }
      autoPausedByHide = false;
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);

  window.addEventListener('blur', function () {
    if (!audio.paused) {
      audio.pause();
      autoPausedByHide = true;
    }
  });

  window.addEventListener('focus', function () {
    if (autoPausedByHide && !isManuallyPaused()) {
      audio.play().catch(function () {});
    }
    autoPausedByHide = false;
  });

  // ---------------------------------------------------------
  // Tutup menu/panel kalau klik di luar FAB
  // ---------------------------------------------------------
  document.addEventListener('click', function () {
    if (menuOpen) toggleMenu();
  });

  // ---------------------------------------------------------
  // Autoplay lagu default (kalau udah ada isinya di songs.js)
  // ---------------------------------------------------------
  if (window.SONGS && SONGS.length > 0) {
    audio.src = SONGS[currentSongIndex].src;

    const tryPlay = function () {
      audio.play().catch(function () {
      });
    };
    tryPlay();

    function onFirstInteraction() {
      if (audio.paused) tryPlay();
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('touchstart', onFirstInteraction);
    }
    document.addEventListener('click', onFirstInteraction);
    document.addEventListener('touchstart', onFirstInteraction);
  }
})();
