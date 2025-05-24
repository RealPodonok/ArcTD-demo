// map.js

export class GameMap {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.cols = 16;
    this.rows = 9;
    this.grid = [];
    this.path = [];

    this.init();
  }

  init() {
    // 0 = свободно, 1 = путь, 2 = занято башней
    this.grid = [
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    ];

    this.path = this.generatePath();
  }

  generatePath() {
    const path = [];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col] === 1) {
          path.push({ x: col * this.tileSize, y: row * this.tileSize });
        }
      }
    }
    return path;
  }

  draw(ctx) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let color = "#5c8a3e"; // трава
        if (this.grid[row][col] === 1) color = "#7a6f58"; // дорога
        if (this.grid[row][col] === 2) color = "#333"; // занято башней

        ctx.fillStyle = color;
        ctx.fillRect(col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
      }
    }
  }

  isBuildable(x, y) {
    const col = Math.floor(x / this.tileSize);
    const row = Math.floor(y / this.tileSize);
    return this.grid[row] && this.grid[row][col] === 0;
  }

  occupy(x, y) {
    const col = Math.floor(x / this.tileSize);
    const row = Math.floor(y / this.tileSize);
    if (this.grid[row] && this.grid[row][col] === 0) {
      this.grid[row][col] = 2;
    }
  }

  getStartPosition() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col] === 1) {
          return { x: col * this.tileSize, y: row * this.tileSize };
        }
      }
    }
    return { x: 0, y: 0 };
  }
}
