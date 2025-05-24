// enemyData.js

export const ENEMY_TYPES = {
  GRUNT: "grunt",
  FAST: "fast",
  TANK: "tank",
  GHOST: "ghost",
  BOSS: "boss"
};

export const enemyData = {
  [ENEMY_TYPES.GRUNT]: {
    name: "Пехотинец",
    hp: 25,
    speed: 1.2,
    reward: 5,
    color: "#A0A0A0",
    soundDeath: "grunt_die.wav"
  },
  [ENEMY_TYPES.FAST]: {
    name: "Быстрый",
    hp: 15,
    speed: 2.0,
    reward: 6,
    color: "#FFCC00",
    soundDeath: "fast_die.wav"
  },
  [ENEMY_TYPES.TANK]: {
    name: "Танк",
    hp: 60,
    speed: 0.8,
    reward: 10,
    color: "#5588FF",
    soundDeath: "tank_die.wav"
  },
  [ENEMY_TYPES.GHOST]: {
    name: "Призрак",
    hp: 20,
    speed: 1.5,
    reward: 7,
    color: "#AA66FF",
    immuneTo: ["slow"],
    transparent: true,
    soundDeath: "ghost_vanish.wav"
  },
  [ENEMY_TYPES.BOSS]: {
    name: "БОСС",
    hp: 300,
    speed: 1.0,
    reward: 50,
    color: "#CC0000",
    boss: true,
    soundDeath: "boss_death.wav",
    size: 2
  }
};
