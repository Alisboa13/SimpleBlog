import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {



  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router:Router
  ) { 
    this.verify(this.route.snapshot.queryParams.uid, this.route.snapshot.queryParams.token);
  }

  ngOnInit() {
  }

  verify(uid: string, token:string){
    this.auth.confirm(uid, token).subscribe(
      (data:any)=>{
        this.snackbar.open("Email confirmed.", "OK", {duration:2000});
        this.router.navigate(['/login']);
      },
      (error:any) => {
        this.snackbar.open("Error Confirming Email.");
        this.router.navigate(['/'])
      }
    )
  }
}
