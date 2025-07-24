import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { TestComponent } from './test/test.component';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'test', component: TestComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', redirectTo: '' }
];
