// game.js - основной JS-файл для демо версии ArcTD

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- ИГРОВЫЕ ПЕРЕМЕННЫЕ ---
let gold = 100;
let wave = 1;
let mobs = [];
let towers = [];
let projectiles = [];

// --- КЛАССЫ ---
class Mob {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 18;
    this.health = 100;
    this.speed = 1.5;
  }
  update() {
    this.x += this.speed; // Простой прямолинейный маршрут
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Tower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.range = 150;
    this.fireRate = 60;
    this.cooldown = 0;
  }
  update() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }
    for (let mob of mobs) {
      const dx = mob.x - this.x;
      const dy = mob.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= this.range) {
        projectiles.push(new Projectile(this.x, this.y, mob));
        this.cooldown = this.fireRate;
        break;
      }
    }
  }
  draw() {
    ctx.fillStyle = "#3cf";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Projectile {
  constructor(x, y, target) {
    this.x = x;
    this.y = y;
    this.target = target;
    this.speed = 4;
  }
  update() {
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 5) {
      this.target.health -= 30;
      return true; // удалить снаряд
    }
    this.x += (dx / dist) * this.speed;
    this.y += (dy / dist) * this.speed;
    return false;
  }
  draw() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- СОБЫТИЯ ---
canvas.addEventListener("click", (e) => {
  towers.push(new Tower(e.clientX, e.clientY));
});

// --- ОСНОВНОЙ ЦИКЛ ---
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Мобы
  for (let i = mobs.length - 1; i >= 0; i--) {
    mobs[i].update();
    if (mobs[i].health <= 0) {
      mobs.splice(i, 1);
      gold += 10;
      continue;
    }
    mobs[i].draw();
  }

  // Башни
  for (let tower of towers) {
    tower.update();
    tower.draw();
  }

  // Снаряды
  for (let i = projectiles.length - 1; i >= 0; i--) {
    if (projectiles[i].update()) {
      projectiles.splice(i, 1);
      continue;
    }
    projectiles[i].draw();
  }

  // UI
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Gold: ${gold}`, 20, 30);
  ctx.fillText(`Wave: ${wave}`, 20, 60);

  requestAnimationFrame(gameLoop);
}

function spawnWave() {
  for (let i = 0; i < 5 + wave; i++) {
    setTimeout(() => {
      mobs.push(new Mob(0, 100 + i * 40));
    }, i * 400);
  }
}

spawnWave();
gameLoop();
