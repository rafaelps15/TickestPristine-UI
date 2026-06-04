import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../application/services/auth.service';
import { Router } from '@angular/router';

/** Componente de UI para a área restrita do sistema. */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard Principal</h1>
      <p>Bem-vindo ao Tickest!</p>
      <button (click)="logout()">Sair</button>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 20px; }
    button { padding: 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; }
  `]
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
