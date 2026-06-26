import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin/signin.page.component').then((m) => m.SigninPageComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page.component').then((m) => m.SignupPageComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page.component').then((m) => m.DashboardPageComponent),
  },
  {
    path: 'plans',
    loadComponent: () => import('./pages/plans/plans.page.component').then((m) => m.PlansPageComponent),
  },
  {
    path: 'plan',
    loadComponent: () => import('./pages/planportal/create/plancreate.page.component').then((m) => m.PlancreatePageComponent),
  },
  {
    path: 'plan/:id',
    loadComponent: () => import('./pages/planportal/create/plancreate.page.component').then((m) => m.PlancreatePageComponent),
  },
  {
    path: 'plan/:id/preview',
    loadComponent: () => import('./pages/planportal/preview/planpreview.page.component').then((m) => m.PlanpreviewPageComponent),
  },
];
