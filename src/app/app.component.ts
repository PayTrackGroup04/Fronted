import { Component } from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs';
import {NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    NgIf,
    HttpClientModule,
  ],
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'PayTrack-Fronted';

  showNavbar = true;
  private hideNavbarRoutes = ['/registro'];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = !this.hideNavbarRoutes.includes(event.urlAfterRedirects);
      });
  }
}
