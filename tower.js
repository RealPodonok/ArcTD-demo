// tower.js

export class Tower {
  constructor(x, y, gameMap) {
    this.x = x;
    this.y = y;
    this.range = 100;
    this.damage = 20;
    this.fireRate = 800; // миллисекунды
    this.lastShotTime = 0;
    this.target = null;
    this.gameMap = gameMap;
    this.level = 1;
    this.maxLevel = 3;

    // Анимация
    this.rotation = 0;
    this.baseSize = 30;
  }

  update(enemies, currentTime) {
    // Найти ближайшего врага
    this.target = this.getNearestEnemy(enemies);
    if (this.target && currentTime - this.lastShotTime >= this.fireRate) {
      this.shoot(this.target);
      this.lastShotTime = currentTime;
    }

    if (this.target) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      this.rotation = Math.atan2(dy, dx);
    }
  }

  shoot(enemy) {
    enemy.takeDamage(this.damage);
    // Здесь можно добавить звук выстрела, частицу и т.д.
  }

  getNearestEnemy(enemies) {
    let nearest = null;
    let minDist = Infinity;

    for (let enemy of enemies) {
      const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
      if (dist <= this.range && dist < minDist && !enemy.isDead) {
        minDist = dist;
        nearest = enemy;
      }
    }
    return nearest;
  }

  upgrade() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.damage += 15;
      this.range += 10;
      this.fireRate -= 100;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    // Башня (тело)
    ctx.fillStyle = "#444";
    ctx.fillRect(-10, -10, 20, 20);

    // Дуло
    ctx.fillStyle = "#999";
    ctx.fillRect(0, -4, 20, 8);

    ctx.restore();

    // Радиус
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();
  }
}
