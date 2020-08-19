import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController{
   constructor(
      private readonly menuService: MenuService
   ) {}
   
   // 菜单列表
   @Get('list')
   async list() {
     const data = await this.menuService.findList()
     return {
        success: true,
        result: data,
        status: HttpStatus.OK,
        msg: null
     }
   }

   //创建菜单
   @Post('create')
   async create(@Body() MenuData) {
      if(!MenuData.menu_name){
         throw new HttpException({
            msg: '菜单名称不能为空！',
            success: false
         }, HttpStatus.OK)
      }
      return await this.menuService.createMenu(MenuData);
   }
} 