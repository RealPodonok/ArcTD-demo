// gameState.js

export const GameState = {
  lives: 10,
  gold: 100,
  currentWave: 0,
  totalWaves: 10,
  isGameOver: false,
  isGameWon: false,

  reset() {
    this.lives = 10;
    this.gold = 100;
    this.currentWave = 0;
    this.isGameOver = false;
    this.isGameWon = false;
  },

  loseLife(amount = 1) {
    this.lives -= amount;
    if (this.lives <= 0) {
      this.isGameOver = true;
    }
  },

  gainGold(amount) {
    this.gold += amount;
  },

  spendGold(amount) {
    if (this.gold >= amount) {
      this.gold -= amount;
      return true;
    }
    return false;
  },

  nextWave() {
    this.currentWave++;
    if (this.currentWave >= this.totalWaves) {
      this.isGameWon = true;
    }
  }
};
