import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private auth:AuthService) { }

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
    this.auth.auth(this.loginForm.value).subscribe(
      item=> {
        console.log("ok!");
      },
      error => {
        this.loginForm.reset();
      }
    )
  }
}
