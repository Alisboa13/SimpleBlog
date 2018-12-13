import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-recover-page',
  templateUrl: './recover-page.component.html',
  styleUrls: ['./recover-page.component.css']
})
export class RecoverPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    ) { }

  recoveryForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  ngOnInit() {
  }

  onSubmit(){
    if(!this.recoveryForm.valid){
      return;
    }
    this.authService.reset(this.recoveryForm.value).subscribe(
      (data: any) => {
        this.snackbar.open("Success")
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.snackbar.open("Error", "ok", {duration: 2000});
      }
    );
  }

}
