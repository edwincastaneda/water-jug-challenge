import {WaterJugState} from '../interfaces/water-jug-state.interface';


export function solveWaterJugAllPaths(capX: number, capY: number, target: number): WaterJugState[][] | string {
  if (target > Math.max(capX, capY)) return 'No solution';
  if (target % gcd(capX, capY) !== 0) return 'No solution';

  const queue: { x: number, y: number, path: WaterJugState[] }[] = [];
  const allSolutions: WaterJugState[][] = [];
  const visited = new Set<string>();

  queue.push({ x: 0, y: 0, path: [{ x: 0, y: 0, explanation: 'Start' }] });

  while (queue.length > 0) {
    const { x, y, path } = queue.shift()!;
    const stateKey = `${x},${y}`;

    if (visited.has(stateKey)) continue;
    visited.add(stateKey);

    if (x === target || y === target) {
      path[path.length - 1].explanation += ' ✅ Solved';
      allSolutions.push(path);
      // No return aquí, seguimos buscando más caminos posibles
    }

    const nextStates: WaterJugState[] = [
      { x: capX, y, explanation: 'Fill bucket X' },
      { x, y: capY, explanation: 'Fill bucket Y' },
      { x: 0, y, explanation: 'Empty bucket X' },
      { x, y: 0, explanation: 'Empty bucket Y' },
      {
        x: Math.max(0, x - (capY - y)),
        y: Math.min(capY, y + x),
        explanation: 'Transfer X → Y',
      },
      {
        x: Math.min(capX, x + y),
        y: Math.max(0, y - (capX - x)),
        explanation: 'Transfer Y → X',
      },
    ];

    for (const next of nextStates) {
      const nextKey = `${next.x},${next.y}`;
      if (!visited.has(nextKey)) {
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
