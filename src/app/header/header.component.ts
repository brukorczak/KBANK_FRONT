import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout(): void {
    const confirmLogout = confirm('Deseja realmete sair?');
    if (confirmLogout) {
      this.router.navigate(['/login']);
    }
  }
}
