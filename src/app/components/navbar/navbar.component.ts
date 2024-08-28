import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  constructor(private _FlowbiteService: FlowbiteService) { };

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(()=>{});
  }

  isRotated = false;
  toggleRotation() {
    this.isRotated = !this.isRotated;
  }

}
