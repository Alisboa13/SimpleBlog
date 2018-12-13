import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BlogService } from 'src/app/services/blog/blog.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-blog-form-page',
  templateUrl: './blog-form-page.component.html',
  styleUrls: ['./blog-form-page.component.css']
})
export class BlogFormPageComponent implements OnInit {

  constructor(
    private blog:BlogService,
    private router:Router,
    private snackbar:MatSnackBar
    ) { }

  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  })

  ngOnInit() {
  }

  onSubmit(){
    this.blog.create(this.blogForm.value).subscribe(
      (data:any) => {
        this.raiseSnackBar("Success")
        this.router.navigate([`blog/${data.id}`])
      },
      (error: any) => {
        this.raiseSnackBar("Error posting blog.")
      }
    )
    this.blogForm.reset();
  }

  raiseSnackBar(message:string){
    this.snackbar.open(message, null, {duration: 2000});
  }
}
