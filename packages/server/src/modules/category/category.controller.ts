import { Controller, Get, Post, Body, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController{
   constructor(
      private readonly categoryService: CategoryService
   ) {}
   
//    @Post('create')
//    async create(@Body() body): Promise<any> {
//       const result = await this.categoryService.create(body);
//       return result;
//    }

   @Get('list')
   async list(@Query() query): Promise<any> {
      const result = await this.categoryService.findAll()
      return {
         success: true,
         result: result,
         status: HttpStatus.OK,
         msg: null
      }
   }
   
} 