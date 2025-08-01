import {WaterJugState} from '../interfaces/water-jug-state.interface';

export function solveWaterJugAllPaths(capX: number, capY: number, target: number): WaterJugState[][] | string {
  if (target > Math.max(capX, capY)) return '🚫 No solution';
  if (target % gcd(capX, capY) !== 0) return '🚫 No solution';

  const queue: { x: number, y: number, path: WaterJugState[] }[] = [];
  const allSolutions: WaterJugState[][] = [];
  const visited = new Set<string>();

  queue.push({ x: 0, y: 0, path: [{ x: 0, y: 0, explanation: '🚀 Start' }] });
  visited.add('0,0');

  while (queue.length > 0) {
    const { x, y, path } = queue.shift()!;

    if (x === target || y === target) {
      const solutionPath = [...path, { x, y, explanation: '🏁 Solved' }];
      allSolutions.push(solutionPath);
      continue;
    }

    const nextStates: WaterJugState[] = [
      { x: capX, y, explanation: '🚰 Fill Jug X' },
      { x, y: capY, explanation: '🚰 Fill Jug Y' },
      { x: 0, y, explanation: '🫙 Empty Jug X' },
      { x, y: 0, explanation: '🫙 Empty Jug Y' },
      {
        x: Math.max(0, x - (capY - y)),
        y: Math.min(capY, y + x),
        explanation: '🫗 Transfer from Jug X ➡️ to Jug Y',
      },
      {
        x: Math.min(capX, x + y),
        y: Math.max(0, y - (capX - x)),
        explanation: '🫗 Transfer to Jug X ⬅️ from Jug Y',
      },
    ];

    for (const next of nextStates) {
      const nextKey = `${next.x},${next.y}`;
      if (!visited.has(nextKey)) {
        visited.add(nextKey);
        queue.push({ x: next.x, y: next.y, path: [...path, next] });
      }
    }
  }

  return allSolutions.length > 0 ? allSolutions : 'No solution';
}

function gcd(a: number, b: number): number {
  if (b === 0) return a;
  return gcd(b, a % b);
}
