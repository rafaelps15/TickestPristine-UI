import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../application/services/auth.service';
import { Router } from '@angular/router';

/** Componente de UI para autenticação de usuários. */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <h2>Login - Tickest</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <input type="email" formControlName="email" placeholder="E-mail">
        <input type="password" formControlName="password" placeholder="Senha">
        
        <button type="submit" [disabled]="form.invalid || authService.state().loading">
          {{ authService.state().loading ? 'Entrando...' : 'Entrar' }}
        </button>

        <p *ngIf="authService.state().error" class="error">
          {{ authService.state().error }}
        </p>
      </form>
    </div>
  `,
  styles: [`
    .login-container { max-width: 400px; margin: 100px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
    .error { color: red; margin-top: 10px; }
    input { display: block; width: 100%; margin-bottom: 10px; padding: 8px; box-sizing: border-box; }
    button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:disabled { background: #ccc; }
  `]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();
      this.authService.login({
        email: raw.email!,
        password: raw.password!
      });

      // Efeito colateral para redirecionar após sucesso
      // Nota: Em uma arquitetura ainda mais pura, isso poderia ser um effect() ou handle no subscribe
    }
  }
}
