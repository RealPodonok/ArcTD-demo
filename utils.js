// utils.js

export function gridToPixel(gridX, gridY, tileSize = 64) {
  return {
    x: gridX * tileSize,
    y: gridY * tileSize
  };
}

export function pixelToGrid(pixelX, pixelY, tileSize = 64) {
  return {
    x: Math.floor(pixelX / tileSize),
    y: Math.floor(pixelY / tileSize)
  };
}

export function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

export function lerp(start, end, t) {
  return start + (end - start) * t;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatGold(value) {
  return `${value} 🪙`;
}

export function formatHP(value) {
  return `${value} ❤`;
}

export function formatWave(waveNumber) {
  return `Волна ${waveNumber}`;
}
