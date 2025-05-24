// waveData.js

import { ENEMY_TYPES } from "./enemyData.js";

export const waves = [
  {
    number: 1,
    delayBetweenSpawns: 1000,
    enemies: [
      { type: ENEMY_TYPES.GRUNT, count: 10 }
    ]
  },
  {
    number: 2,
    delayBetweenSpawns: 900,
    enemies: [
      { type: ENEMY_TYPES.GRUNT, count: 6 },
      { type: ENEMY_TYPES.FAST, count: 6 }
    ]
  },
  {
    number: 3,
    delayBetweenSpawns: 900,
    enemies: [
      { type: ENEMY_TYPES.TANK, count: 3 },
      { type: ENEMY_TYPES.GRUNT, count: 4 }
    ]
  },
  {
    number: 4,
    delayBetweenSpawns: 800,
    enemies: [
      { type: ENEMY_TYPES.GHOST, count: 6 },
      { type: ENEMY_TYPES.FAST, count: 4 }
    ]
  },
  {
    number: 5,
    delayBetweenSpawns: 500,
    enemies: [
      { type: ENEMY_TYPES.GRUNT, count: 4 },
      { type: ENEMY_TYPES.FAST, count: 4 },
      { type: ENEMY_TYPES.TANK, count: 2 },
      { type: ENEMY_TYPES.GHOST, count: 2 }
    ]
  },
  {
    number: 6,
    delayBetweenSpawns: 800,
    enemies: [
      { type: ENEMY_TYPES.BOSS, count: 1 }
    ],
    isBossWave: true
  }
];
