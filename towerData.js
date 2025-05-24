// towerData.js

export const TOWER_TYPES = {
  BASIC: "basic",
  SNIPER: "sniper",
  FIRE: "fire",
  ICE: "ice",
  BOSS_BREAKER: "bossBreaker"
};

export const towerData = {
  [TOWER_TYPES.BASIC]: {
    name: "Стрелковая",
    damage: 5,
    range: 2.5,
    fireRate: 1.0,
    cost: 50,
    projectile: "arrow",
    sound: "basic_shot.wav"
  },
  [TOWER_TYPES.SNIPER]: {
    name: "Снайперская",
    damage: 15,
    range: 5,
    fireRate: 2.5,
    cost: 100,
    projectile: "bullet",
    sound: "sniper_shot.wav"
  },
  [TOWER_TYPES.FIRE]: {
    name: "Огненная",
    damage: 3,
    range: 2,
    fireRate: 0.5,
    cost: 70,
    effect: "burn", // DOT
    duration: 3,
    projectile: "fireball",
    sound: "fire_cast.wav"
  },
  [TOWER_TYPES.ICE]: {
    name: "Ледяная",
    damage: 2,
    range: 2.5,
    fireRate: 1.2,
    cost: 80,
    effect: "slow",
    slowAmount: 0.5,
    duration: 2,
    projectile: "ice_shard",
    sound: "ice_cast.wav"
  },
  [TOWER_TYPES.BOSS_BREAKER]: {
    name: "Анти-Босс",
    damageMultiplier: 0.12, // 12% от max HP босса
    range: 3,
    fireRate: 3,
    cost: 150,
    projectile: "light_blast",
    sound: "boss_blast.wav"
  }
};
