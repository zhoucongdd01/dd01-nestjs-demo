import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity()
export class Category{
   
   // 分类id
   @PrimaryColumn()
   category_id: number
   
   // 所属分类id
   @Column()
   category_name: string

   // 路由
   @Column()
   category_path: string

   @OneToMany(type => Article, article => article.category)
   articles: Article[]
}
