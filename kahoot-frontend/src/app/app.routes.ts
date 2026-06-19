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
    path: 'quizzes',
    loadComponent: () => import('./pages/quizesplan/quizesplan.page.component').then((m) => m.QuizesplanPageComponent),
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quizeportal/quizeportal.page.component').then((m) => m.QuizeportalPageComponent),
    children: [
      {
        path: ':id',
        loadComponent: () => import('./pages/quizeportal/create/quizecreate.page.component').then((m) => m.QuizecreatePageComponent),
      },
      {
        path: ':id/preview',
        loadComponent: () => import('./pages/quizeportal/preview/quizepreview.page.component').then((m) => m.QuizepreviewPageComponent),
      },
    ],
  },
];
