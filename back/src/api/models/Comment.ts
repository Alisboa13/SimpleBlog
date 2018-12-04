import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment{

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Post, post => post.comments)
  blog_id: Post

  @ManyToOne(type => User, user => user.comments)
  maker: User

  @Column({lenght: 256})
  comment: string

  @CreateDateColumn()
  creation_date : Date
}
