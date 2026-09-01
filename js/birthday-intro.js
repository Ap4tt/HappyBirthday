(function () {
  const burstLayer = document.getElementById('burstLayer');
  if (!burstLayer) return;

  const items = burstFillInstant(burstLayer);

  function waitForImages(items) {
    const promises = items.map(function (item) {
      const img = item.el;
      if (img.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    });
    return Promise.all(promises);
  }

  waitForImages(items).then(function () {
    setTimeout(function () {
      burstOpenFromCenter(items, function () {
        burstLayer.remove();
      });
    }, 250);
  });
})();
