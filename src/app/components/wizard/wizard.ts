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

  jar_a: number = 0;
  jar_b: number = 0;
  jar_c: number = 0;


  ngAfterViewInit() {
    if (!(window as any).Zangdar) {
      console.error('Zangdar no está cargado');
      return;
    }

    const wizard = new (window as any).Zangdar('#wizard', {
      onStepChange: () => {
        this.onStepChange(wizard, 'steps-native');
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        const formElements = (e.target as HTMLFormElement).elements as any;

        const jarAValue = parseInt(formElements.namedItem('jar_a').value, 10);
        const jarBValue = parseInt(formElements.namedItem('jar_b').value, 10);
        const jarCValue = parseInt(formElements.namedItem('jar_c').value, 10);

        this.jar_a = jarAValue;
        this.jar_b = jarBValue;
        this.jar_c = jarCValue;

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
