import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-blog-form-page',
  templateUrl: './blog-form-page.component.html',
  styleUrls: ['./blog-form-page.component.css']
})
export class BlogFormPageComponent implements OnInit {

  constructor(private blog:BlogService) { }

  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  })

  ngOnInit() {
  }

  onSubmit(){
    this.blog.create(this.blogForm.value).subscribe(
      (data:any) => {
        if(data){
          console.log('hellow');
        }
      }
    )
    this.blogForm.reset();
  }
}
