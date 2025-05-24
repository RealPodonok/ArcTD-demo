// towerManager.js

import { Tower } from "./tower.js";

export class TowerManager {
  constructor(tileSize, map, moneyManager, showMessage) {
    this.towers = [];
    this.tileSize = tileSize;
    this.map = map;
    this.moneyManager = moneyManager;
    this.showMessage = showMessage;
  }

  canPlaceTower(x, y) {
    const col = Math.floor(x / this.tileSize);
    const row = Math.floor(y / this.tileSize);
    if (this.map[row][col] === 1) return false; // 1 = дорога
    return !this.towers.some(t => t.row === row && t.col === col);
  }

  placeTower(x, y) {
    const col = Math.floor(x / this.tileSize);
    const row = Math.floor(y / this.tileSize);

    if (!this.canPlaceTower(x, y)) {
      this.showMessage("Нельзя строить здесь");
      return false;
    }

    const cost = 50;
    if (!this.moneyManager.spend(cost)) {
      this.showMessage("Недостаточно золота");
      return false;
    }

    const tower = new Tower(row, col, this.tileSize);
    this.towers.push(tower);
    this.showMessage("Башня построена");
    return true;
  }

  update(enemies) {
    this.towers.forEach(t => t.update(enemies));
  }

  draw(ctx) {
    this.towers.forEach(t => t.draw(ctx));
  }

  upgradeTower(x, y) {
    const col = Math.floor(x / this.tileSize);
    const row = Math.floor(y / this.tileSize);
    const tower = this.towers.find(t => t.row === row && t.col === col);

    if (!tower) {
      this.showMessage("Нет башни для улучшения");
      return;
    }

    const cost = tower.getUpgradeCost();
    if (!this.moneyManager.spend(cost)) {
      this.showMessage("Недостаточно золота");
      return;
    }

    tower.upgrade();
    this.showMessage("Башня улучшена");
  }
}
