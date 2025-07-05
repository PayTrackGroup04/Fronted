import { Component } from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs';
import {NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {AuthenticationService} from './login/services/authentication.service';
import {UserService} from './profiles/services/user.service';

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
  isSignedIn: boolean = false;
  username: string = "";
  userId: number = -1;

  showNavbar = true;
  private hideNavbarRoutes = ['/registro'];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = !this.hideNavbarRoutes.includes(event.urlAfterRedirects);
      });
  }

  ngOnInit() {
    this.authenticationService.isSignedIn.subscribe(isSignedIn => {
      this.isSignedIn = isSignedIn;
    });
  }

  getName(){
    this.authenticationService.currentUsername.subscribe(username => this.username = username);
    console.log(this.username);
  }
  getId(){
    this.authenticationService.currentUserId.subscribe(id => this.userId = id);
  }
}
