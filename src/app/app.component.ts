import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthNavbarComponent } from "./components/auth-navbar/auth-navbar.component";
import { FlowbiteService } from './core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AuthNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerce';
  constructor(private _FlowbiteService: FlowbiteService) {
    this._FlowbiteService.loadFlowbite(() => { });
  }
}
