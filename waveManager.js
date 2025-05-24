// waveManager.js

import { Enemy } from "./enemy.js";

export class WaveManager {
  constructor(path, onWaveComplete, onLifeLost, onEnemyKilled, addMoney, showMessage) {
    this.path = path;
    this.onWaveComplete = onWaveComplete;
    this.onLifeLost = onLifeLost;
    this.onEnemyKilled = onEnemyKilled;
    this.addMoney = addMoney;
    this.showMessage = showMessage;

    this.waveNumber = 0;
    this.enemies = [];
    this.spawnTimer = 0;
    this.spawnInterval = 60; // кадры между спавнами
    this.enemiesToSpawn = 0;
    this.waveInProgress = false;

    this.preparingNextWave = false;
    this.waveCountdown = 300; // 5 секунд на подготовку
  }

  startNextWave() {
    this.waveNumber++;
    this.waveInProgress = true;
    this.enemies = [];
    this.enemiesToSpawn = 10 + this.waveNumber * 2;

    // Уведомление
    if (this.waveNumber % 5 === 0) {
      this.enemiesToSpawn = 1;
      this.showMessage("Босс идёт!");
    } else {
      this.showMessage("Волна начинается");
    }
  }

  update(playerBase) {
    if (!this.waveInProgress && !this.preparingNextWave) {
      this.preparingNextWave = true;
      this.waveCountdown = 300; // 5 секунд
    }

    if (this.preparingNextWave) {
      this.waveCountdown--;
      if (this.waveCountdown <= 0) {
        this.preparingNextWave = false;
        this.startNextWave();
      }
      return;
    }

    this.spawnTimer++;
    if (this.spawnTimer >= this.spawnInterval && this.enemiesToSpawn > 0) {
      const type = this.getEnemyType();
      const enemy = new Enemy(this.path, type);
      this.enemies.push(enemy);
      this.enemiesToSpawn--;
      this.spawnTimer = 0;
    }

    this.enemies.forEach((enemy, index) => {
      enemy.update();

      if (enemy.reachedEnd() && !enemy.isDead) {
        this.onLifeLost();
        enemy.isDead = true;
      }

      if (enemy.isDead && !enemy.rewarded) {
        this.addMoney(enemy.reward);
        this.onEnemyKilled();
        enemy.rewarded = true;
      }
    });

    this.enemies = this.enemies.filter(e => !e.isDead || !e.rewarded);

    if (this.waveInProgress && this.enemiesToSpawn === 0 && this.enemies.length === 0) {
      this.waveInProgress = false;
      this.onWaveComplete();
    }
  }

  draw(ctx) {
    this.enemies.forEach(enemy => {
      enemy.draw(ctx);
    });

    if (this.preparingNextWave) {
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(`Следующая волна через ${Math.ceil(this.waveCountdown / 60)}...`, 20, 30);
    }
  }

  getEnemyType() {
    if (this.waveNumber % 5 === 0) return "tank";
    if (this.waveNumber > 6 && Math.random() < 0.3) return "ghost";
    if (Math.random() < 0.5) return "fast";
    return "normal";
  }
}
