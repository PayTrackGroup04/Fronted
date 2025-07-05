import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {SignInRequest} from '../../model/sign-in.request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  myForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;
  userId: number = -1;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.myForm = this.builder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  toggleForm() {
    this.router.navigate(['/sign-up']);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      console.log('Formulario inválido');
      return;
    }
    let username = this.myForm.value.username;
    let password = this.myForm.value.password;
    const signInRequest = new SignInRequest(username ?? '', password ?? '');
    this.submitted = true;
    this.authenticationService.signIn(signInRequest)
      .then(() => {
        console.log('Login exitoso');
        this.authenticationService.currentUserId.subscribe(id =>{
          this.userId = id;
          localStorage.setItem('userId', String(id));
        });
        console.log(this.userId);
        this.router.navigate(['/registro']);
      })
      .catch(error => {
        console.error('Error en login:', error);
      });
  }
}
