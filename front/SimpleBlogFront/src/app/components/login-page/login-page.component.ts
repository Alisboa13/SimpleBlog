import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  
  getErrorMessage() {
    let email = this.loginForm.get('email');
    return email.hasError('required') ? 'You must enter an email': email.hasError('email') ? 'Not a valid email' : '';
  }

  hide = true;

  onSubmit(){
    console.log(this.loginForm.value);
  }
}
