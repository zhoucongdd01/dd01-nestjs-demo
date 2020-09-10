import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Article{

   // 文章id
   @PrimaryGeneratedColumn('uuid')
   article_id: string
   
   // 文章图片
   @Column()
   article_img: string
   
   // 文章标题
   @Column()
   article_title: string

   // 文章内容
   @Column()
   article_content: string

   // 文章html
   @Column({type: 'longtext'})
   article_html: string

   // 文章阅读量
   @Column()
   preview_count: number
   
   // 文章创建日期
   @Column({type: 'datetime'})
   create_time: string
   
   @Column()
   category_id: number
   
   @ManyToOne(type => Category, category => category.articles)
   @JoinColumn({name: 'category_id'})
   category: Category

   @OneToMany(type => Comment, comment => comment.Article, {
      cascade: true
   })
   Comments:  Comment[]

}
