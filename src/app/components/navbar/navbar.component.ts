import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly _AuthService = inject(AuthService);

  name!: string;
  ngOnInit(): void {
    this._AuthService.saveUserData()
    this.name = this._AuthService.userData.name;
  }

  isRotated: boolean = false;
  toggleRotation(): void {
    this.isRotated = !this.isRotated;    
  }

  logOut(): void {
    this._AuthService.logOut();
  }
}