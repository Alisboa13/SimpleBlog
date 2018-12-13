import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyErrorStateMatcher } from '../register-page/register-page.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.scss']
})
export class ResetPageComponent implements OnInit {

  hidePassword: boolean = true;
  hidecpass: boolean = true;
  resetForm: FormGroup;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  private token:any;

  constructor(
    private fb:FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      cpass: ['']
    }, {validator: this.checkPassword})
    this.token = this.route.snapshot.queryParams.access_token;
    if(!this.token){
      this.router.navigate(['/']);
    }
    }

  ngOnInit() {

  }

  checkPassword(group: FormGroup) : ValidationErrors | null{
    let pass = group.controls.password.value;
    let cpass = group.controls.cpass.value;
    return pass === cpass ? null : { notSame: true };
  }

  onSubmit(){
    if(this.resetForm.invalid){
      return 
    }
    else{
      this.auth.newPassword({newPassword : this.resetForm.value.password}, {access_token: this.token}).subscribe(
        (data: any) => {
          this.router.navigate(['/login']);
        },
        (error: any)=> {

        }
      )
    }
    this.resetForm.reset()
  }

}
