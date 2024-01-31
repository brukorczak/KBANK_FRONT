import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout(): void {
    const confirmLogout = confirm('Deseja realmete sair?');
    if (confirmLogout) {
      this.router.navigate(['/login']);
    }
  }
}
