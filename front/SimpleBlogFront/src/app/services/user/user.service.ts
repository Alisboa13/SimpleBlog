import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'src/app/shared/Config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUsername(id:number):Observable<any>{
    return Observable.create(observer => {
      this.http.get<any>(Config.USER_API + id.toString() + "/getName").subscribe(
        (data: any) => {
          observer.next(data.name);
          observer.complete()   
        },
        (error: any) => {
          observer.error(new Error("Can't get user"));
          observer.complete()
        }
      )
    })
  }
}
