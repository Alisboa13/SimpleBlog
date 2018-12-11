import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';

export interface Credentials{
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router) { }

  private static AUTHORIZATION_API= '/bunnies/login';


  public auth(credential : Credentials): Observable<boolean>{
    return Observable.create(observer => {
      this.http.post<any>(AuthService.AUTHORIZATION_API, credential).subscribe(
        (data : any) => {
          //Success
          const token: string = data;
          observer.next(true);
          this.router.navigate(['/']);
          
        }, 
        (error: any) => {
          //Failure
        }
      )
    });
  }
}
