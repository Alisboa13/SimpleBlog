import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from 'src/app/services/blog/blog.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';



export interface Blog{
  title: string;
  content: string;
  id: number;
  creatorID: number;
}

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  constructor(private blog: BlogService,
    private userService: UserService,
    private router: Router) { }

  @Input() public blogid: number;
  @Input() public Blog: Blog | null;

  //Shown data
  title: string;
  creatorName: string;
  content: string;

  ngOnInit() {
    if(!this.Blog){
      //this.placeholder();
      this.downloadData();
    }
    else{
      this.getCreatorName(this.Blog.creatorID);
      this.title = this.Blog.title;
      this.content = this.Blog.content;
    }
  }

  placeholder(){
    this.title = "title";
    this.content = "...";
    this.creatorName = "unknow";
  }

  getCreatorName(id: number){
    this.userService.getUsername(id).subscribe(
      (data: any) => {
        this.creatorName = data;
      },
      (error: any) => {
        console.log(error);
        this.creatorName = "Unkown";
      }
    )
  }

  downloadData(){
    this.blog.getBlog(this.blogid).subscribe(
      (data: any) => {
        this.title = data.title;
        this.content = data.content;
        this.getCreatorName(data.creatorID);
      },
      (error: any) => {
        this.title = "error";
        this.content = "Error";
        this.creatorName = "Error";
      }
    )
  }

  goToPage(){
    if(!this.Blog){
      this.router.navigate([`/blog/${this.blogid.toString()}`])
    }
    else{
      this.router.navigate([`/blog/${this.Blog.id.toString()}`])
    }
  }

}
