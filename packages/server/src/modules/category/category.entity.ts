import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category{
   
   // 分类id
   @PrimaryGeneratedColumn()
   category_id: number
   
   // 所属分类id
   @Column()
   category_name: string
}
