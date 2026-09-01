
const BURST_FLOWER_SRCS = ['images/Flower1.png', 'images/Flower2.png'];
const BURST_HEART_SRCS = ['images/Heart1.png', 'images/Heart2.png'];
const BURST_FLOWER_RATIO = 0.68;
const BURST_SIZE_MIN = 100;
const BURST_SIZE_MAX = 300;
const BURST_CELL_SIZE = 160;

function burstPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function burstGridPoints() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cols = Math.ceil(vw / BURST_CELL_SIZE) + 2;
  const rows = Math.ceil(vh / BURST_CELL_SIZE) + 2;
  const cellW = vw / cols;
  const cellH = vh / rows;

  const points = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const jitterX = (Math.random() - 0.5) * cellW * 0.8;
      const jitterY = (Math.random() - 0.5) * cellH * 0.8;
      points.push({
        x: col * cellW + jitterX,
        y: row * cellH + jitterY
      });
    }
  }
  return points;
}

function burstCreateParticle(point) {
  const isFlower = Math.random() < BURST_FLOWER_RATIO;
  const src = isFlower ? burstPick(BURST_FLOWER_SRCS) : burstPick(BURST_HEART_SRCS);
  const size = BURST_SIZE_MIN + Math.random() * (BURST_SIZE_MAX - BURST_SIZE_MIN);
  const rot = Math.random() * 70 - 35;

  const el = document.createElement('img');
  el.src = src;
  el.alt = '';
  el.className = 'burst-item';
  el.style.width = size + 'px';
  el.style.left = point.x + 'px';
  el.style.top = point.y + 'px';
  el.style.setProperty('--rot', rot.toFixed(1) + 'deg');

  return { el: el, x: point.x, y: point.y };
}

/**
 * Fase 1: partikel terbang dari satu titik asal (misal posisi amplop)
 * menyebar ke seluruh layar. Dipakai di envelope.html.
 * @returns array item {el, x, y} — buat dipakai fase berikutnya kalau perlu.
 */
function burstFlyOut(container, originX, originY, onDone) {
  const points = burstGridPoints();
  const items = [];
  let maxTotal = 0;

  points.forEach(function (point) {
    const item = burstCreateParticle(point);
    const fromDx = originX - point.x;
    const fromDy = originY - point.y;

    const dist = Math.sqrt(fromDx * fromDx + fromDy * fromDy);
    const distFactor = dist / Math.max(window.innerWidth, window.innerHeight);
    const delay = distFactor * 0.9 + Math.random() * 0.4;
    const duration = 1.5 + Math.random() * 0.5;
    maxTotal = Math.max(maxTotal, delay + duration);

    item.el.style.setProperty('--fromDx', fromDx + 'px');
    item.el.style.setProperty('--fromDy', fromDy + 'px');
    item.el.style.animationDelay = delay.toFixed(2) + 's';
    item.el.style.animationDuration = duration.toFixed(2) + 's';
    item.el.classList.add('is-flying');

    container.appendChild(item.el);
    items.push(item);
  });

  if (onDone) setTimeout(onDone, maxTotal * 1000 + 200);
  return items;
}

function burstFillInstant(container) {
  const points = burstGridPoints();
  const items = [];

  points.forEach(function (point) {
    const item = burstCreateParticle(point);
    item.el.classList.add('is-settled');
    container.appendChild(item.el);
    items.push(item);
  });

  return items;
}

/**
 * Fase membuka dari tengah: partikel yang paling deket titik tengah
 * layar mulai "kabur" duluan, menjauh dari tengah, sampai semua ilang.
 */
function burstOpenFromCenter(items, onDone) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const centerX = vw / 2;
  const centerY = vh / 2;
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
  let maxTotal = 0;

  items.forEach(function (item) {
    const fromCenterX = item.x - centerX;
    const fromCenterY = item.y - centerY;
    const dist = Math.sqrt(fromCenterX * fromCenterX + fromCenterY * fromCenterY) || 1;

    const pushDist = dist * 1.8 + Math.max(vw, vh) * 0.4;
    const openX = centerX + (fromCenterX / dist) * pushDist;
    const openY = centerY + (fromCenterY / dist) * pushDist;

    const delay = (dist / maxDist) * 0.6;
    const duration = 0.8 + Math.random() * 0.4;
    maxTotal = Math.max(maxTotal, delay + duration);

    item.el.style.setProperty('--openDx', (openX - item.x) + 'px');
    item.el.style.setProperty('--openDy', (openY - item.y) + 'px');
    item.el.style.animationDelay = delay.toFixed(2) + 's';
    item.el.style.animationDuration = duration.toFixed(2) + 's';
    item.el.classList.remove('is-settled');
    item.el.classList.add('is-opening');
  });

  if (onDone) setTimeout(onDone, maxTotal * 1000 + 150);
}
