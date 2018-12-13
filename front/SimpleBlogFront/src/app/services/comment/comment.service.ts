import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'src/app/shared/Config';

export interface Comment{
  content: string;
  blogId: number;
}


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  public postComment(c : Comment):Observable<any>{
    return Observable.create(observer => {
      this.http.post<any>(Config.COMMENT_API, c).subscribe(
        (data: any) => {
          observer.next(data);
          observer.complete();
        },
        (error:any) => {
          console.error(error);
          observer.error(error);
          observer.complete();
        }
      )
    })
  }
}
