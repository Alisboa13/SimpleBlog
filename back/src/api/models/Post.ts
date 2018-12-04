import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column("text")
  content: string

  @ManyToOne(type => User, user => user.posts)
  user: User

  @OneToMany(type => Comment, comment => comment.blog_id)
  comments: Comment[];
}
