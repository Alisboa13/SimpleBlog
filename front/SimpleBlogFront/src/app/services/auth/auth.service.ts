import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';

export interface Credentials{
  email: string;
  password: string;
}

interface signup{
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router) { }

  private static AUTHORIZATION_API= 'http://10.0.0.2:3000/api/bunnies/login';
  private static USER_API = 'http://10.0.0.2:3000/api/bunnies'


  public auth(credential : Credentials): Observable<boolean>{
    return Observable.create(observer => {
      this.http.post<any>(AuthService.AUTHORIZATION_API, credential).subscribe(
        (data : any) => {
          //Success
          const token: string = data;
          localStorage.setItem('token', JSON.stringify(data));
          const ob = data
          this.getUser(ob.userId).subscribe(
            (user: any) => {
              const usr: string = JSON.stringify(user);
              localStorage.setItem('user', usr);
              observer.next(true);
              this.router.navigate(['/']);
              observer.complete();
            },
            (error: any) => {
              console.log(error);
              this.logout();
              observer.error(new Error("Can't get User Data"));
              observer.complete();
            }
          )
        }, 
        (error: any) => {
          //error
          const e : string = error;
          console.error(e);
          this.logout();
          observer.error(new Error('Login failed'));
          observer.complete();
        }
      )
    });
  }

  public register(credential : signup): Observable<boolean>{
    return Observable.create(observer => {
      this.http.post<any>(AuthService.USER_API, credential).subscribe(
        (data : any) => {
          //Success
          observer.next(true);
          observer.complete();
        },
        (error: any) => {
          //Failure
          console.error(error);
          observer.error(error);
          observer.complete();
        }
      )
    });
  }

  public getUser(id : number){
    const url = AuthService.USER_API + '/' + id.toString();
    return this.http.get<any>(url)
  }

  public logout(){
    sessionStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  public getAccessToken(){
    let credentials = localStorage.getItem('token');
    if (!credentials || credentials === 'null'){
      return null;
    }
    let ob = JSON.parse(credentials);
    return ob.id;
  }
  
  public getLoggedUser(){
    let user = localStorage.getItem('user');
    if (!user || user === 'null'){
      return null
    }
    return JSON.parse(user);
  }


}
