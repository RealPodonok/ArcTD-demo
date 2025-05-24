const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 480;

let towers = [];
let enemies = [];
let bullets = [];
let skills = {
  lightning: { cooldown: 10, lastUsed: -Infinity }
};

let gold = 100;
let lives = 10;
let wave = 0;
let gameRunning = false;
let placingTower = false;
let countdown = 5;

const tileSize = 40;
const gridCols = canvas.width / tileSize;
const gridRows = canvas.height / tileSize;

let mapGrid = new Array(gridRows).fill(0).map(() => new Array(gridCols).fill(0));
const path = [
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
  [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
  [10, 5], [11, 5], [12, 5], [13, 5], [14, 5],
  [15, 5], [16, 5], [17, 5], [18, 5], [19, 5]
];

document.getElementById("start-wave").addEventListener("click", () => {
  if (!gameRunning) {
    gameRunning = true;
    wave++;
    startCountdown();
  }
});

document.getElementById("lightning-skill").addEventListener("click", () => {
  const now = Date.now() / 1000;
  if (now - skills.lightning.lastUsed >= skills.lightning.cooldown) {
    useLightningSkill();
    skills.lightning.lastUsed = now;
  }
});

canvas.addEventListener("click", (e) => {
  if (!placingTower) return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / tileSize);
  const y = Math.floor((e.clientY - rect.top) / tileSize);

  if (canPlaceTower(x, y)) {
    towers.push({ x, y, level: 1, fireCooldown: 0 });
    mapGrid[y][x] = 1;
    gold -= 20;
    placingTower = false;
  }
});

function canPlaceTower(x, y) {
  if (mapGrid[y][x] !== 0) return false;
  return !path.some(([px, py]) => px === x && py === y);
}

function useLightningSkill() {
  enemies.forEach(e => {
    if (e.type === "boss") {
      e.hp -= e.maxHp * 0.2;
    } else {
      e.hp -= 40;
    }
  });
}

function startCountdown() {
  countdown = 5;
  const interval = setInterval(() => {
    countdown--;
    if (countdown <= 0) {
      clearInterval(interval);
      spawnWave();
    }
  }, 1000);
}

function spawnWave() {
  const isBossWave = wave % 5 === 0;
  let count = 10 + wave * 2;
  for (let i = 0; i < count; i++) {
    const delay = i * 500;
    setTimeout(() => {
      enemies.push(createEnemy());
    }, delay);
  }

  if (isBossWave) {
    setTimeout(() => {
      showBossWarning();
      setTimeout(() => {
        enemies.push(createBoss());
      }, 3000);
    }, count * 500);
  }
}

function createEnemy() {
  return {
    x: path[0][0] * tileSize,
    y: path[0][1] * tileSize,
    hp: 30 + wave * 5,
    maxHp: 30 + wave * 5,
    speed: 1,
    pathIndex: 0,
    type: wave % 3 === 0 ? "ghost" : "normal"
  };
}

function createBoss() {
  return {
    x: path[0][0] * tileSize,
    y: path[0][1] * tileSize,
    hp: 400 + wave * 100,
    maxHp: 400 + wave * 100,
    speed: 0.6,
    pathIndex: 0,
    type: "boss"
  };
}

function updateGame() {
  updateEnemies();
  updateTowers();
  updateBullets();
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawPath();
  drawTowers();
  drawEnemies();
  drawBullets();
  drawUI();
}

function drawGrid() {
  for (let y = 0; y < gridRows; y++) {
    for (let x = 0; x < gridCols; x++) {
      ctx.strokeStyle = "#444";
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

function drawPath() {
  ctx.fillStyle = "#6b4f28";
  path.forEach(([x, y]) => {
    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
  });
}

function drawTowers() {
  towers.forEach(t => {
    ctx.fillStyle = "#22aaff";
    ctx.fillRect(t.x * tileSize + 8, t.y * tileSize + 8, 24, 24);
  });
}

function drawEnemies() {
  enemies.forEach(e => {
    ctx.fillStyle = e.type === "boss" ? "#800080" : (e.type === "ghost" ? "#9999ff" : "#ff5555");
    ctx.beginPath();
    ctx.arc(e.x + tileSize / 2, e.y + tileSize / 2, tileSize / 3, 0, Math.PI * 2);
    ctx.fill();

    // HP bar
    ctx.fillStyle = "red";
    ctx.fillRect(e.x, e.y - 5, tileSize, 4);
    ctx.fillStyle = "green";
    ctx.fillRect(e.x, e.y - 5, tileSize * (e.hp / e.maxHp), 4);
  });
}

function drawBullets() {
  bullets.forEach(b => {
    ctx.fillStyle = "#ffff00";
    ctx.beginPath();
    ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawUI() {
  document.getElementById("gold").innerText = `Золото: ${gold}`;
  document.getElementById("lives").innerText = `Жизни: ${lives}`;
  document.getElementById("wave").innerText = `Волна: ${wave}`;
  document.getElementById("countdown").innerText = countdown > 0 ? `Старт через: ${countdown}` : "";
}

function updateEnemies() {
  enemies.forEach(e => {
    const target = path[e.pathIndex + 1];
    if (!target) {
      lives--;
      e.hp = 0;
      return;
    }

    const tx = target[0] * tileSize;
    const ty = target[1] * tileSize;
    const dx = tx - e.x;
    const dy = ty - e.y;
    const dist = Math.hypot(dx, dy);

    if (dist < e.speed) {
      e.pathIndex++;
    } else {
      e.x += (dx / dist) * e.speed;
      e.y += (dy / dist) * e.speed;
    }
  });

  enemies = enemies.filter(e => e.hp > 0);
}

function updateTowers() {
  towers.forEach(t => {
    t.fireCooldown -= 1;
    if (t.fireCooldown <= 0) {
      const target = enemies.find(e => {
        const dx = e.x - t.x * tileSize;
        const dy = e.y - t.y * tileSize;
        return Math.hypot(dx, dy) < 120;
      });
      if (target) {
        bullets.push({ x: t.x * tileSize + 20, y: t.y * tileSize + 20, target });
        t.fireCooldown = 30;
      }
    }
  });
}

function updateBullets() {
  bullets.forEach(b => {
    const dx = b.target.x + tileSize / 2 - b.x;
    const dy = b.target.y + tileSize / 2 - b.y;
    const dist = Math.hypot(dx, dy);
    b.x += (dx / dist) * 5;
    b.y += (dy / dist) * 5;

    if (dist < 5) {
      b.target.hp -= 15;
      b.hit = true;
    }
  });

  bullets = bullets.filter(b => !b.hit);
}

function showBossWarning() {
  const warning = document.getElementById("boss-warning");
  warning.classList.remove("hidden");
  setTimeout(() => warning.classList.add("hidden"), 2500);
}

function gameLoop() {
  updateGame();
  drawGame();
  requestAnimationFrame(gameLoop);
}

gameLoop();
