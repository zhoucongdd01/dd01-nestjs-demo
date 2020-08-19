import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
} from 'typeorm';

import { AvatarEntity } from './avatar.entity'


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    username: string;

    @Column({ length: 500 })
    password: string;

    // @Column()
    // avatar: string
}
