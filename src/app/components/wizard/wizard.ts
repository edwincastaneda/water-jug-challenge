import { Component } from '@angular/core';
import {JugValidator} from '../jug-validator/jug-validator';
import {buildStepsBreadcrumb} from '../../utils/wizard-helpers';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.html',
  standalone: true,
  imports: [
    JugValidator
  ],
  styleUrl: './wizard.scss'
})
export class Wizard {

  jar_x: number = 1;
  jar_y: number = 1;
  desire_volume: number = 1;


  ngAfterViewInit() {
    if (!(window as any).Zangdar) {
      console.error('Zangdar no está cargado');
      return;
    }


    const rangeInputx = document.getElementById('range_jar_x') as HTMLInputElement;
    const rangeInputy = document.getElementById('range_jar_y') as HTMLInputElement;
    const rangeInputx_icon = document.getElementById('range_jar_x_icon') as HTMLInputElement;
    const rangeInputy_icon = document.getElementById('range_jar_y_icon') as HTMLInputElement;
    const hiddenInputx = document.getElementById('jar_x') as HTMLInputElement;
    const hiddenInputy = document.getElementById('jar_y') as HTMLInputElement;

    const jarX = document.getElementById('jarX') as HTMLInputElement;
    const jarY = document.getElementById('jarY') as HTMLInputElement;

    hiddenInputx.value = rangeInputx.value;
    hiddenInputy.value = rangeInputy.value;

    rangeInputx.addEventListener('input', function () {
      hiddenInputx.value = this.value;
      rangeInputx_icon.innerHTML = this.value;
      jarX.style.width = `${72 + parseInt(hiddenInputx.value, 10)}px`;

    });

    rangeInputy.addEventListener('input', function () {
      hiddenInputy.value = this.value;
      rangeInputy_icon.innerHTML = this.value;
      jarY.style.width = `${72 + parseInt(hiddenInputy.value, 10)}px`;
    });


    const wizard = new (window as any).Zangdar('#wizard', {
      onStepChange: () => {
        this.onStepChange(wizard, 'steps-native');
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        const formElements = (e.target as HTMLFormElement).elements as any;

        const jarXValue = parseInt(formElements.namedItem('jar_x').value, 10);
        const jarYValue = parseInt(formElements.namedItem('jar_y').value, 10);
        const DesireVolumeValue = parseInt(formElements.namedItem('desire_volume').value, 10);

        this.jar_x = jarXValue;
        this.jar_y = jarYValue;
        this.desire_volume = DesireVolumeValue;

        wizard.next?.();
        return false;
      },
    });

    this.onStepChange(wizard, 'steps-native');
  }


  onStepChange(wizard: any, selector: string) {
    const steps = wizard.getBreadcrumb();
    buildStepsBreadcrumb(wizard, selector, steps);
  }


}
