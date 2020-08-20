import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export class BaseMenu{
    @PrimaryGeneratedColumn()
    menu_id: number

    @Column()
    menu_name: string

    @Column()
    menu_path: string
}


@Entity()
export class Menu extends BaseMenu{

}

@Entity()
export class SubMenu extends BaseMenu{
    @Column()
    parent_id: number
}

