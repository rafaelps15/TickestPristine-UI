import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Componente principal que atua como host das rotas da aplicação. */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`
})
export class AppComponent { }
