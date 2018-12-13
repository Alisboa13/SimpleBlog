import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

export interface Comment{
  content: string;
  blogId: number;
  creatorID: number;
  id: number;
}


@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  constructor(private userService:UserService) { }

  @Input() public comment: Comment;
  username: string;

  ngOnInit() {
    this.getUsername();
  }

  getUsername(){
    this.userService.getUsername(this.comment.creatorID).subscribe(
      (data: any) => {
        this.username = data;
      },
      (error: any) => {
        this.username = "Error";
      }
    )
  }
}
