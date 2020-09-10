import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';

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

