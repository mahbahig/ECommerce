import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  // constructor(private _FlowbiteService: FlowbiteService) { };

  // ngOnInit(): void {
  //   this._FlowbiteService.loadFlowbite(()=>{});
  // }

  isRotated = false;
  toggleRotation() {
    this.isRotated = !this.isRotated;
  }

}
