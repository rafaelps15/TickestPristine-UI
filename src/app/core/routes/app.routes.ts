import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

/** Definição de rotas da aplicação com proteção e carregamento sob demanda. */
export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('../../ui/features/user/user-register/user-register.component')
      .then(m => m.UserRegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('../../ui/features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../../ui/shared/layouts/main-layout/main-layout.component')
      .then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../../ui/features/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
