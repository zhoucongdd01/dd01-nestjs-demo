import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Banner {
   
   // 主键id
   @PrimaryColumn()
   id: number
   
   @Column()
   name: string

   @Column()
   url: string

   @Column()
   status: number

   @Column()
   sort: number

   @Column()
   img: string

}