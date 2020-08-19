import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';

import {UserEntity} from './user.entity'

@Entity()
export class AvatarEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    width: number;

    @Column()
    height: number
}

