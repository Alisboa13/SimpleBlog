import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

  bid: number;
  comments : any[];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {
    this.bid = this.route.snapshot.params.id;
   }

  ngOnInit() {
    this.blogService.getComments(this.bid).subscribe(
      (data: any) => {
        this.comments = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}
