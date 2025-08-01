import {Component, Input, SimpleChanges} from '@angular/core';
import {WaterJugState} from '../../interfaces/water-jug-state.interface';
import { solveWaterJugAllPaths } from '../../utils/water-jug-solver';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-jug-validator',
  imports: [CommonModule],
  templateUrl: './jug-validator.html',
  standalone: true,
  styleUrl: './jug-validator.scss'
})
export class JugValidator {

  @Input() capX!: number;
  @Input() capY!: number;
  @Input() target!: number;

  solutions: WaterJugState[][] = [];
  errorMessage = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (this.capX && this.capY && this.target) {
      this.calculateSolutions();
    }
  }

  calculateSolutions(): void {
    const result = solveWaterJugAllPaths(this.capX, this.capY, this.target);

    if (typeof result === 'string') {
      this.errorMessage = result;
      this.solutions = [];
    } else {
      this.errorMessage = '';
      this.solutions = result;
    }
  }

}
