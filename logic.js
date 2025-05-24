function upgradeTower(index) {
  const tower = towers[index];
  const upgradeCost = 30 + tower.level * 20;

  if (gold >= upgradeCost && tower.level < 3) {
    tower.level++;
    gold -= upgradeCost;
    tower.fireCooldown = Math.max(15, 30 - tower.level * 5);
  }
}

function sellTower(index) {
  const tower = towers[index];
  const sellValue = 15 + tower.level * 10;

  mapGrid[tower.y][tower.x] = 0;
  towers.splice(index, 1);
  gold += sellValue;
}

function isWaveOver() {
  return enemies.length === 0 && gameRunning;
}

function handleWaveEnd() {
  if (isWaveOver()) {
    gameRunning = false;
    gold += 20 + wave * 5;
  }
}

function resetGame() {
  towers = [];
  enemies = [];
  bullets = [];
  gold = 100;
  lives = 10;
  wave = 0;
  gameRunning = false;
  placingTower = false;
  mapGrid = new Array(gridRows).fill(0).map(() => new Array(gridCols).fill(0));
}

function pauseGame() {
  // Pauses game loop (optional implementation)
  // Add pause state flag and skip updates/draws in gameLoop
}

function resumeGame() {
  // Resumes game loop (optional implementation)
}
