// gameUI.js

export class GameUI {
  constructor(game) {
    this.game = game;
    this.waveDisplay = document.getElementById("wave-display");
    this.healthDisplay = document.getElementById("health-display");
    this.goldDisplay = document.getElementById("gold-display");
    this.startButton = document.getElementById("start-wave-btn");
    this.messageDisplay = document.getElementById("message-display");

    this.startButton.addEventListener("click", () => {
      this.game.startNextWave();
    });

    this.update();
  }

  update() {
    this.waveDisplay.textContent = `Волна: ${this.game.currentWave + 1}/${this.game.totalWaves}`;
    this.healthDisplay.textContent = `Здоровье: ${this.game.health}`;
    this.goldDisplay.textContent = `Золото: ${this.game.gold}`;
  }

  showMessage(message, duration = 2000) {
    this.messageDisplay.textContent = message;
    this.messageDisplay.style.opacity = 1;

    setTimeout(() => {
      this.messageDisplay.style.opacity = 0;
    }, duration);
  }

  disableStartButton() {
    this.startButton.disabled = true;
    this.startButton.textContent = "Волна идёт...";
  }

  enableStartButton() {
    this.startButton.disabled = false;
    this.startButton.textContent = "Начать волну";
  }
}
