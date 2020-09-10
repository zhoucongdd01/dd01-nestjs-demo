import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Article } from '../article/article.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment{
  
   // 评论id
   @PrimaryColumn()
   comment_id: number
   
   // 回复用户id
   @Column({nullable: true})
   to_user_id: number
   
   // 回复评论id
   @Column({nullable: true})
   to_comment_id: number
   
   // 评论内容
   @Column()
   comment_content: string

   @CreateDateColumn({
      type: 'datetime'
   })
   comment_time: Date;

   @Column()
   star_count: number

   @Column({nullable: true})
   star_users: string
  
   // 文章id
   @Column()
   article_id: string
   @ManyToOne(type => Article, article => article.Comments)
   @JoinColumn({name: 'article_id'})
   Article: Article
   
   // 用户id
   @Column({nullable: true})
   user_id: number
   @ManyToOne(type => User, user => user.Comments)
   @JoinColumn({name: 'user_id'})
   User: User

}
