import { Component, inject } from '@angular/core';
import { AuthService } from '../../../application/services/auth.service';
import { Router } from '@angular/router';

/** Componente de UI para a área restrita do sistema. */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
