import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    screen_name: string

    @Column()
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
