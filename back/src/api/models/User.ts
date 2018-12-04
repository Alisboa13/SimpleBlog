import { Entity,  Column, OneToMany, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class User{
    @Column()
    screen_name: string

    @PrimaryColumn()
    user_name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    credentials: string

    @OneToMany(type => Post, post => post.user)
    posts = Post[];

    @OneToMany(type => Comment, comment => comment.maker)
    comments = Comment[];

}
