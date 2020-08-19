import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu, SubMenu } from './menu.entity';

@Injectable()
export class MenuService{
  constructor(
      @InjectRepository(Menu)
      private readonly menuRepository: Repository<Menu>,
      @InjectRepository(SubMenu)
      private readonly subMenuRepository: Repository<SubMenu>,
  ) {}

  // 查询菜单列表
  async findList(): Promise<Menu[]> {
    const menuList = await this.menuRepository.find();
    const subMenuList = await this.subMenuRepository.find();
    const newMenuList = menuList.map( item => {
        return {
            ... item,
            sub_menu: subMenuList.filter(subitem => subitem.parent_id === item.menu_id)
        }
    })
    return newMenuList;
  }

  // 新建菜单
  async createMenu(menu: Menu & SubMenu): Promise<Menu> {
    if (menu.parent_id) {
        const newMenu = await this.subMenuRepository.create(menu);
        await this.subMenuRepository.save(newMenu)
        return newMenu;
    } else {
        const newMenu = await this.menuRepository.create(menu);
        await this.menuRepository.save(newMenu);
        return newMenu;
    }
  }
  
  

}