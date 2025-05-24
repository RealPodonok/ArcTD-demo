// collision.js

export function isColliding(a, b, range = 10) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < range;
}
