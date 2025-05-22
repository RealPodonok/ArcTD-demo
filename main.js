// main.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 960;
canvas.height = 540;

let gold = 250;
let wave = 1;
let enemies = [];
let towers = [];
let projectiles = [];
let skills = {
  slow: 1,
  freeze: 1,
  lightning: 1,
};

function drawUI() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, 40);
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.fillText(`Gold: ${gold}`, 10, 25);
  ctx.fillText(`Wave: ${wave}`, 100, 25);
  ctx.fillText(`Skills - S: ${skills.slow}, F: ${skills.freeze}, L: ${skills.lightning}`, 200, 25);
}

function spawnEnemy(type = 'normal') {
  const hp = type === 'boss' ? 1000 : 100 + wave * 10;
  enemies.push({ x: 0, y: 260, hp, speed: 1 + wave * 0.1, type });
}

function spawnWave() {
  for (let i = 0; i < wave * 4; i++) {
    setTimeout(() => spawnEnemy(), i * 1000);
  }
  setTimeout(() => spawnEnemy('boss'), wave * 400);
}

function placeTower(x, y) {
  if (gold >= 100) {
    towers.push({ x, y, level: 1 });
    gold -= 100;
  }
}

function fireTowers() {
  towers.forEach(tower => {
    enemies.forEach(enemy => {
      if (Math.abs(tower.x - enemy.x) < 100 && Math.abs(tower.y - enemy.y) < 100) {
        projectiles.push({ x: tower.x, y: tower.y, target: enemy });
      }
    });
  });
}

function updateEnemies() {
  enemies.forEach(enemy => {
    enemy.x += enemy.speed;
    if (enemy.x > canvas.width) {
      enemy.hp = 0;
    }
  });
  enemies = enemies.filter(e => e.hp > 0);
}

function updateProjectiles() {
  projectiles.forEach(p => {
    p.x += (p.target.x - p.x) * 0.1;
    p.y += (p.target.y - p.y) * 0.1;
    if (Math.abs(p.x - p.target.x) < 5 && Math.abs(p.y - p.target.y) < 5) {
      p.target.hp -= 50;
    }
  });
  projectiles = projectiles.filter(p => p.target.hp > 0);
}

function useSkill(type) {
  if (skills[type] > 0) {
    skills[type]--;
    if (type === 'lightning') {
      enemies.forEach(e => {
        if (e.type !== 'boss') e.hp -= e.hp * 0.7;
        else e.hp -= e.hp * 0.2;
      });
    } else if (type === 'slow') {
      enemies.forEach(e => e.speed *= 0.5);
    } else if (type === 'freeze') {
      enemies.forEach(e => e.speed = 0);
      setTimeout(() => {
        enemies.forEach(e => e.speed = 1 + wave * 0.1);
      }, 3000);
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawUI();

  enemies.forEach(e => {
    ctx.fillStyle = e.type === 'boss' ? 'red' : 'green';
    ctx.fillRect(e.x, e.y, 30, 30);
  });

  towers.forEach(t => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(t.x, t.y, 30, 30);
  });

  fireTowers();
  updateEnemies();
  updateProjectiles();

  projectiles.forEach(p => {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  placeTower(x, y);
});

window.addEventListener('keydown', e => {
  if (e.key === 's') useSkill('slow');
  if (e.key === 'f') useSkill('freeze');
  if (e.key === 'l') useSkill('lightning');
});

spawnWave();
gameLoop();
