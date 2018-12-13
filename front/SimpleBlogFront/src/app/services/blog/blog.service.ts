import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/shared/Config';

export interface Blog{
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient, private router:Router) {  }

  public create(blog: Blog): Observable<any>{
    return Observable.create(observer => {
      this.http.post<any>(Config.BLOG_API, blog).subscribe(
        (data: any) => {
          //Success
          observer.next(data);
          observer.complete();
        },
        (error: any) => {
          //Failure
          observer.error(new Error('error'));
          observer.complete();
        }
      )
    })
  }

  public getBlog(id: number): Observable<Blog>{
    return Observable.create(observer => {
      this.http.get<any>(Config.BLOG_API + id.toString()).subscribe(
        (data: any) => {
          observer.next(data);
          observer.complete();
        },
        (error: any) => {
          observer.error(new Error("Can't get blog."))
          observer.complete();
        }
      )
    })
  }

  public getFive(): Observable<any>{
    return Observable.create(observer => {
      this.http.get<any>(Config.BLOG_API, {params: {["filter[limit]"] : "5"}}).subscribe(
        (data: any) => {
          observer.next(data);
          observer.complete();
        },
        (error: any) => {
          observer.error(error);
          observer.complete();
        }
      )
    })
  }

  public postComment(blogid: number, comment: any): Observable<any>{
    return Observable.create(observer => {
      this.http.post<any>(Config.BLOG_API + blogid.toString() + '/comments/', comment).subscribe(
        (data: any) => {
          observer.next(data);
          observer.complete();
        },
        (error: any) => {
          observer.error(error)
          observer.complete();
        }
      )
    })
  }

  public getComments(blogid: number):Observable<any>{
    return Observable.create(observer => {
      this.http.get<any>(Config.BLOG_API + blogid.toString() + "/comments/").subscribe(
        (data: any) => {
          observer.next(data);
          observer.complete();
        },
        (error:any) => {
          observer.error(error);
          observer.complete();
        }
      )
    })
  }
}
