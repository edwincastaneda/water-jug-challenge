

// Helper function to check if a path is valid and a solution
import {WaterJugState} from '../app/interfaces/water-jug-state.interface';
import {solveWaterJugAllPaths} from '../app/utils/water-jug-solver';

function isValidSolution(path: WaterJugState[], capX: number, capY: number, target: number): boolean {
  if (path.length < 2) return false;

  // The first state must be the start state
  const startState = path[0];
  if (startState.x !== 0 || startState.y !== 0 || startState.explanation !== '🚀 Start') {
    return false;
  }

  // The last state must be the solved state
  const finalState = path[path.length - 1];
  if (finalState.explanation !== '🏁 Solved' || (finalState.x !== target && finalState.y !== target)) {
    return false;
  }

  // Check the logical flow of the path
  for (let i = 0; i < path.length - 1; i++) {
    const currentState = path[i];
    const nextState = path[i + 1];

    // Check if the next state is a valid transition from the current state
    const possibleNextStates = [
      // Fill X
      { x: capX, y: currentState.y },
      // Fill Y
      { x: currentState.x, y: capY },
      // Empty X
      { x: 0, y: currentState.y },
      // Empty Y
      { x: currentState.x, y: 0 },
      // Transfer X -> Y
      {
        x: Math.max(0, currentState.x - (capY - currentState.y)),
        y: Math.min(capY, currentState.y + currentState.x),
      },
      // Transfer Y -> X
      {
        x: Math.min(capX, currentState.x + currentState.y),
        y: Math.max(0, currentState.y - (capX - currentState.x)),
      },
    ];

    const isNextStateValid = possibleNextStates.some(
      (state) => state.x === nextState.x && state.y === nextState.y
    );

    if (!isNextStateValid) {
      return false;
    }
  }

  return true;
}

describe('solveWaterJugAllPaths', () => {

  // Casos de éxito con soluciones conocidas
  describe('Happy path: cases with a solution', () => {
    it('should find a valid path for capX=3, capY=5, target=4', () => {
      const capX = 3;
      const capY = 5;
      const target = 4;
      const result = solveWaterJugAllPaths(capX, capY, target);

      expect(Array.isArray(result)).toBeTrue();
      if (Array.isArray(result)) {
        expect(result.length).toBeGreaterThan(0);
        result.forEach(path => {
          expect(isValidSolution(path, capX, capY, target)).toBeTrue();
        });
      }
    });

    it('should find a valid path for capX=5, capY=3, target=4', () => {
      const capX = 5;
      const capY = 3;
      const target = 4;
      const result = solveWaterJugAllPaths(capX, capY, target);

      expect(Array.isArray(result)).toBeTrue();
      if (Array.isArray(result)) {
        expect(result.length).toBeGreaterThan(0);
        result.forEach(path => {
          expect(isValidSolution(path, capX, capY, target)).toBeTrue();
        });
      }
    });
  });

  // Casos sin solución
  describe('No solution cases', () => {
    it('should return "🚫 No solution" when target is greater than the largest jug', () => {
      const capX = 2;
      const capY = 4;
      const target = 5;
      const result = solveWaterJugAllPaths(capX, capY, target);
      expect(result).toBe('🚫 No solution');
    });

    it('should return "🚫 No solution" when target is not a multiple of GCD', () => {
      // GCD(6, 10) = 2. Target 3 is not a multiple of 2.
      const capX = 6;
      const capY = 10;
      const target = 3;
      const result = solveWaterJugAllPaths(capX, capY, target);
      expect(result).toBe('🚫 No solution');
    });
  });

  // Casos de borde
  describe('Edge cases', () => {
    it('should return a path when target is equal to capX', () => {
      const capX = 3;
      const capY = 5;
      const target = 3;
      const result = solveWaterJugAllPaths(capX, capY, target);
      expect(Array.isArray(result)).toBeTrue();
      if (Array.isArray(result)) {
        expect(result.length).toBeGreaterThan(0);
      }
    });

    it('should return a path when target is equal to capY', () => {
      const capX = 3;
      const capY = 5;
      const target = 5;
      const result = solveWaterJugAllPaths(capX, capY, target);
      expect(Array.isArray(result)).toBeTrue();
      if (Array.isArray(result)) {
        expect(result.length).toBeGreaterThan(0);
      }
    });
  });

});
