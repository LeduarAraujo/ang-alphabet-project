import { Routes } from '@angular/router';
import { Module1Component } from './module1/module1.component';
import { Module2Component } from './module2/module2.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'module1',
    pathMatch: 'full'
  },
  {
    path: 'module1',
    component: Module1Component
  },
  {
    path: 'module2',
    component: Module2Component
  }
];
