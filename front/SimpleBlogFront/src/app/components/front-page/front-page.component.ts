import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

  blogs: any[];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getFive().subscribe(
      (data: any) => {
        this.blogs = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}
