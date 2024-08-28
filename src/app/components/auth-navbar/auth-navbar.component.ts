import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss'
})
export class AuthNavbarComponent implements OnInit{
  constructor(private _FlowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(() => { });
  }

  isRotated = false;
  toggleRotation() {
    this.isRotated = !this.isRotated;
  }

}
