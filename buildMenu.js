// buildMenu.js

import { GameState } from './gameState.js';
import { createTower } from './tower.js';

export class BuildMenu {
  constructor(canvas, ctx, tileSize, map, towers) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.tileSize = tileSize;
    this.map = map;
    this.towers = towers;
    this.menuVisible = false;
    this.selectedTile = null;

    this.towerTypes = [
      { type: 'arrow', cost: 30 },
      { type: 'magic', cost: 50 },
      { type: 'cannon', cost: 70 }
    ];

    this.canvas.addEventListener('click', this.handleClick.bind(this));
  }

  show(x, y) {
    const tileX = Math.floor(x / this.tileSize);
    const tileY = Math.floor(y / this.tileSize);
    if (this.map[tileY][tileX] === 0 && !this.isTowerPresent(tileX, tileY)) {
      this.selectedTile = { x: tileX, y: tileY };
      this.menuVisible = true;
    } else {
      this.hide();
    }
  }

  hide() {
    this.menuVisible = false;
    this.selectedTile = null;
  }

  isTowerPresent(x, y) {
    return this.towers.some(tower => tower.x === x && tower.y === y);
  }

  handleClick(event) {
    if (!this.menuVisible) return;

    const rect = this.canvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;

    this.towerTypes.forEach((tower, i) => {
      const btnX = this.selectedTile.x * this.tileSize + i * 40;
      const btnY = this.selectedTile.y * this.tileSize;

      if (
        mx >= btnX &&
        mx <= btnX + 32 &&
        my >= btnY &&
        my <= btnY + 32
      ) {
        if (GameState.spendGold(tower.cost)) {
          this.towers.push(createTower(tower.type, this.selectedTile.x, this.selectedTile.y));
        }
        this.hide();
      }
    });
  }

  draw() {
    if (!this.menuVisible || !this.selectedTile) return;

    this.towerTypes.forEach((tower, i) => {
      const x = this.selectedTile.x * this.tileSize + i * 40;
      const y = this.selectedTile.y * this.tileSize;

      this.ctx.fillStyle = '#ddd';
      this.ctx.fillRect(x, y, 32, 32);
      this.ctx.fillStyle = '#000';
      this.ctx.fillText(tower.type[0].toUpperCase(), x + 12, y + 20);
    });
  }
}
