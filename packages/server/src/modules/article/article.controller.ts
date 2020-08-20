import { Controller, Get, Post, Body, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController{
   constructor(
      private readonly articleService: ArticleService
   ) {}
   
   @Post('create')
   async create(@Body() body): Promise<any> {
      const result = await this.articleService.create(body);
      return result;
   }

   @Get('list')
   async list(@Query() query): Promise<any> {
      const result = await this.articleService.findAll()
      return {
         success: true,
         result: result,
         status: HttpStatus.OK,
         msg: null
      }
   }
   
} 