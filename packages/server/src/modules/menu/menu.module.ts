import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menu, SubMenu} from './menu.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Menu, SubMenu])],
  exports: [MenuService],
  controllers: [MenuController],
  providers: [MenuService]
})

export class MenuModule{}