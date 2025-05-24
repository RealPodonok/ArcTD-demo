// enemy.js

export class Enemy {
  constructor(path, type = "normal") {
    this.path = path;
    this.type = type;

    this.speed = 1.2;
    this.maxHealth = 100;
    this.health = 100;
    this.color = "green";
    this.size = 20;
    this.reward = 10;

    // Позиция
    this.tileIndex = 0;
    this.x = path[0].x;
    this.y = path[0].y;

    // Перемещение
    this.dx = 0;
    this.dy = 0;
    this.isDead = false;

    this.setType(type);
  }

  setType(type) {
    switch (type) {
      case "fast":
        this.speed = 2;
        this.maxHealth = 60;
        this.color = "orange";
        this.reward = 15;
        break;
      case "tank":
        this.speed = 0.7;
        this.maxHealth = 200;
        this.color = "darkred";
        this.reward = 25;
        break;
      case "ghost":
        this.speed = 1.4;
        this.maxHealth = 80;
        this.color = "rgba(150, 0, 255, 0.6)";
        this.reward = 20;
        break;
      default:
        break;
    }
    this.health = this.maxHealth;
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.isDead = true;
    }
  }

  update() {
    if (this.isDead || this.tileIndex >= this.path.length - 1) return;

    const target = this.path[this.tileIndex + 1];
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const dist = Math.hypot(dx, dy);

    if (dist < this.speed) {
      this.x = target.x;
      this.y = target.y;
      this.tileIndex++;
    } else {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }
  }

  draw(ctx) {
    if (this.isDead) return;

    // Тело
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Здоровье
    const hpPercent = this.health / this.maxHealth;
    ctx.fillStyle = "red";
    ctx.fillRect(this.x - 10, this.y - 15, 20, 4);
    ctx.fillStyle = "lime";
    ctx.fillRect(this.x - 10, this.y - 15, 20 * hpPercent, 4);
  }

  reachedEnd() {
    return this.tileIndex >= this.path.length - 1;
  }
}
