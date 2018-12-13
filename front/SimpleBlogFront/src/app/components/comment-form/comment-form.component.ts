import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CommentService } from 'src/app/services/comment/comment.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Input() blogid: number;

  commentForm = new FormGroup({
    content : new FormControl('', [Validators.required, Validators.maxLength(256)])
  })

  constructor(
    private commentService:CommentService,
    private router: Router,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.commentForm.invalid){
      return;
    }
    let data = this.commentForm.value;
    this.commentService.postComment({content: data.content, blogId:this.blogid}).subscribe(
      (data:any) => {
        this.snackbar.open("Comment posted.", "OK", {duration: 2000})
        window.location.reload();
      },
      (error:any) => {
        this.snackbar.open("Couln't create commment.", "OK", {duration: 2000});
        console.log(error);
      }
    )
    this.commentForm.reset();
  }

}
