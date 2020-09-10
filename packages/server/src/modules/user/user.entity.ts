import { 
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    OneToMany,
    ManyToMany,
} from 'typeorm';

import { Comment } from '../comment/comment.entity';


@Entity()
export class User {
    
    // 主键id
    @PrimaryColumn()
    user_id: number

    @Column({ length: 500 })
    username: string;

    @Column({ length: 500 })
    password: string;

    @Column()
    email: string

    @Column()
    avatar: string
    
    @OneToMany(type => Comment, comment => comment.User, {
        cascade: true
    })
    Comments: Comment[]
}
