import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  signupForm : FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private auth: AuthService, private router:Router) { 

    this.signupForm = fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cpass : ['']
    }, {validators: this.checkPassword});
  // signupForm = new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   cpass: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required]),
  // }, [this.checkPassword]);
  }

  ngOnInit() {
  }


  hidePassword = true;
  hidecpass = true;

  checkPassword(group: FormGroup) : ValidationErrors | null{
    let pass = group.controls.password.value;
    let cpass = group.controls.cpass.value;
    return pass === cpass ? null : { notSame: true };
  }

  getErrorMessage(component: string) {
    let control = this.signupForm.get(component);

    switch (component) {
      case 'username':
        return control.hasError('required') ? 'You must enter an username' : '';
        break;
      case 'email':
        return control.hasError('required') ? 'You must enter an email': control.hasError('email') ? 'Not a valid email' : '';
        break;
      case 'password':
        return control.hasError('required') ? 'You must enter a password' : '';
        break;
      case 'cpass':
        return control.hasError('required') ? 'You must enter the password' : this.checkPassword(this.signupForm) ? 'The passwords are different' : '';
      default:
        return control.hasError('required') ? 'This field is required' : ''
        break;
    }
  }

  onSubmit(){
    const data = this.signupForm.value;
    this.auth.register({username: data.username, email:data.email, password:data.password}).subscribe(
      (data: any) => {
        console.log(data)
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error(error)
      }
    )
    this.signupForm.reset();
  }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
