import { Routes } from '@angular/router';
import {Wizard} from './components/wizard/wizard';

export const routes: Routes = [
  { path: '', redirectTo: 'wizard', pathMatch: 'full' },
  { path: 'wizard', component: Wizard },
]
