// soundManager.js

export class SoundManager {
  constructor() {
    this.sounds = {
      background: new Audio("sounds/bg_music.mp3"),
      shoot: new Audio("sounds/shoot.wav"),
      hit: new Audio("sounds/hit.wav"),
      enemyDie: new Audio("sounds/enemy_die.wav"),
      startWave: new Audio("sounds/start_wave_rus.mp3"),
      bossComing: new Audio("sounds/boss_coming_rus.mp3"),
    };

    this.sounds.background.loop = true;
    this.sounds.background.volume = 0.2;

    this.loaded = false;
  }

  play(name) {
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }

  startMusic() {
    this.sounds.background.play().catch(() => {});
  }

  stopMusic() {
    this.sounds.background.pause();
    this.sounds.background.currentTime = 0;
  }
}
