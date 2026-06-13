import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/sign-in/sign-in').then((m) => m.SignInComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/sign-up/sign-up').then((m) => m.SignUpComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
  },
  {
    path: 'quizzes',
    loadComponent: () => import('./pages/quizzes/quizzes').then((m) => m.QuizzesComponent),
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz-layout').then((m) => m.QuizLayoutComponent),
    children: [
      {
        path: ':id',
        loadComponent: () => import('./pages/quiz-create/quiz-create').then((m) => m.QuizCreateComponent),
      },
      {
        path: ':id/preview',
        loadComponent: () => import('./pages/quiz-preview/quiz-preview').then((m) => m.QuizPreviewComponent),
      },
    ],
  },
];
