import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 isLogin = true; // true = Login, false = SignUp
 myForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    contra: new FormControl('')
  });

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.isLogin) {
      console.log('Login Form Submitted', this.myForm.value);
    } else {
      console.log('Sign Up Form Submitted', this.myForm.value);
    }
  }

}

