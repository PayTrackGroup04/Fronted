import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {SignUpRequest} from '../../model/sign-up.request';
import {Router} from '@angular/router';
import {SignInRequest} from '../../model/sign-in.request';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  myForm = new FormGroup({
    nombre: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;
  userId : number = -1;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit () {
    this.myForm = this.builder.group({
      nombre: ['', Validators.required],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  toggleForm() {
    this.router.navigate(['/sign-in']);
  }

  onSubmit() {
    let username = this.myForm.value.username;
    let password = this.myForm.value.password;
    let nombre = this.myForm.value.nombre;
    const signUpRequest = new SignUpRequest(username ?? '', password ?? '', nombre ?? '');
    this.submitted = true;
    this.authenticationService.signUp(signUpRequest)
      .then(() => {
        this.authenticationService.signIn(new SignInRequest(username ?? '', password ?? ''))
      })
      .catch(error => {
        console.error('Sign-up failed:', error);
      });
  }
}
