// pathfinder.js

export function findPath(map, start, goal) {
  const queue = [start];
  const visited = new Set();
  const cameFrom = new Map();
  const key = (x, y) => `${x},${y}`;
  visited.add(key(...start));

  const directions = [
    [0, -1], // up
    [1, 0],  // right
    [0, 1],  // down
    [-1, 0]  // left
  ];

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    if (x === goal[0] && y === goal[1]) {
      const path = [];
      let curr = goal;
      while (curr) {
        path.unshift(curr);
        curr = cameFrom.get(key(...curr));
      }
      return path;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        ny >= 0 && ny < map.length &&
        nx >= 0 && nx < map[0].length &&
        map[ny][nx] === 1 && // only walkable path
        !visited.has(key(nx, ny))
      ) {
        queue.push([nx, ny]);
        visited.add(key(nx, ny));
        cameFrom.set(key(nx, ny), [x, y]);
      }
    }
  }

  return null;
}
