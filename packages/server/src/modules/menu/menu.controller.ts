import { Controller, Get, Post, Body } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController{
   constructor(
      private readonly menuService: MenuService
   ) {}
   
   // 菜单列表
   @Get('list')
   async list() {
     return await this.menuService.findList();
   }

   //创建菜单
   @Post('create')
   async create(@Body() MenuData) {
      return await this.menuService.createMenu(MenuData);
   }
} 