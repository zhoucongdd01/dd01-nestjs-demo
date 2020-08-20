import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Article{
   
   // 文章id
   @PrimaryGeneratedColumn()
   article_id: number
   
   // 所属分类id
   @Column()
   category_id: number
   
   // 文章图片
   @Column()
   article_img: string
   
   // 文章标题
   @Column()
   article_title: string

   // 文章内容
   @Column()
   article_content: string

   // 文章阅读量
   @Column()
   preview_count: number
   
   // 文章创建日期
   @Column({type: 'datetime'})
   create_time: string
}
