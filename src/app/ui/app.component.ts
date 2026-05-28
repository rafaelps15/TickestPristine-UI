import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserRegisterComponent } from './features/user/user-register/user-register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserRegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TickestPristine';
}
