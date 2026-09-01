(function () {
  const fill = document.getElementById('progressFill');
  const percentLabel = document.getElementById('progressPercent');
  const enterBtn = document.getElementById('enterBtn');

  let progress = 0;

  function tick() {
    if (progress < 100) {
      progress += Math.floor(Math.random() * 8) + 4;
      if (progress > 100) progress = 100;

      fill.style.width = progress + '%';
      percentLabel.textContent = progress;

      setTimeout(tick, 150 + Math.random() * 150);
    } else {
      onLoadingComplete();
    }
  }

  function onLoadingComplete() {
  const progressWrap = document.getElementById('progressWrap');

  const beforeTop = progressWrap.getBoundingClientRect().top;

  enterBtn.hidden = false; 

  const afterTop = progressWrap.getBoundingClientRect().top;
  const deltaY = beforeTop - afterTop; // seberapa jauh dia kedorong ke atas

  if (deltaY !== 0) {
    progressWrap.animate(
      [
        { transform: 'translateY(' + deltaY + 'px)' }, // titik "sebelum" (posisi lama)
        { transform: 'translateY(0)' }                  // balik ke posisi akhir yang bener
      ],
      {
        duration: 350,
        easing: 'cubic-bezier(0.22, 0.9, 0.36, 1)',
        fill: 'both'
      }
    );
  }

  requestAnimationFrame(function () {
    enterBtn.classList.add('is-visible');
  });
}
  enterBtn.addEventListener('click', function () {
    window.location.href = 'login.html';
  });

  tick();
})();
