import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {SignUpRequest} from '../model/sign-up.request';
import {SignUpResponse} from '../model/sign-up.response';
import {SignInRequest} from '../model/sign-in.request';
import {SignInResponse} from '../model/sign-in.response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  basePath: string = `${environment.serverBasePath}`;
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private signedInNombre: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router, private http: HttpClient) {
  }

  get isSignedIn() {
    return this.signedIn.asObservable();
  }

  get currentUserId() {
    return this.signedInUserId.asObservable();
  }
  get currentUsername() {
    return this.signedInUsername.asObservable();
  }


  signUp(signUpRequest: SignUpRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<SignUpResponse>(`${this.basePath}/authentication/sign-up`, signUpRequest, this.httpOptions)
        .subscribe({
          next: (response) => {
            this.signedInUserId.next(response.id);
            this.router.navigate(['/sign-in']).then(() => resolve());
          },
          error: (error) => {
            console.error(`Error while signing up: ${error.message}`);
            this.router.navigate(['/sign-up']).then(() => reject(error));
          }
        });
    });
  }


  signIn(signInRequest: SignInRequest) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions)
        .subscribe({
          next: (response) => {
            this.signedIn.next(true);
            this.signedInUserId.next(response.id);
            this.signedInNombre.next(response.nombre);
            this.signedInUsername.next(response.username);
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']).then(() => resolve());
          },
          error: (error) => {
            this.signedIn.next(false);
            this.signedInUserId.next(0);
            this.signedInUsername.next('');
            localStorage.removeItem('token');
            console.error(`Error while signing in: ${error.message}`);
            this.router.navigate(['/sign-in']).then(() => reject(error));
          }
        });
    });
  }

  signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInUsername.next('');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']).then();
  }
}
