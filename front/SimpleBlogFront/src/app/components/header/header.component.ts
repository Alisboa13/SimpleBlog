import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit() {
  }

  getLoggedUsername(){
    let user = this.auth.getLoggedUser();
    if(!user){
      return null;
    }
    return user.username;
  }

  isLogged(){
    if(this.getLoggedUsername()){
      return true;
    }
    else{
      return false;
    }
  }

  goToSignup(){
    this.router.navigate(['/register']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  logoff(){
    this.auth.logout();
  }
}
