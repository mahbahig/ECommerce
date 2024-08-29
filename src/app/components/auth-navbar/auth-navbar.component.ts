import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class AuthNavbarComponent {
  // constructor(private _FlowbiteService: FlowbiteService) { }

  // ngOnInit(): void {
  // }

  isRotated = false;
  toggleRotation() {
    this.isRotated = !this.isRotated;
  }

}
