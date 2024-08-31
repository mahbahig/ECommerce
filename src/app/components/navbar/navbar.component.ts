import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly _Router = inject(Router);

  isRotated = false;
  toggleRotation() {
    this.isRotated = !this.isRotated;
  }

  logOut() {
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login']);
  }
}