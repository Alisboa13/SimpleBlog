import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Input() blogid: number;

  commentForm = new FormGroup({
    content : new FormControl('', [Validators.required])
  })

  constructor(private commentService:CommentService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("start")
    let data = this.commentForm.value;
    this.commentService.postComment({content: data.content, blogId:this.blogid}).subscribe(
      (data:any) => {
        console.log(data);
      },
      (error:any) => {
        console.log(error);
      }
    )
    this.commentForm.reset();
  }

}
