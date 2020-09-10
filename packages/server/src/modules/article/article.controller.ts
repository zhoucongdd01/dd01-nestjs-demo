import { Controller, Get, Post, Body, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

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
      const result = await this.articleService.findAll(query);
      return {
         success: true,
         result: result,
         status: HttpStatus.OK,
         msg: null
      }
   }

   @Get('recommend')
   async recommend(): Promise<any>{
      const result = await this.articleService.findRecommend();
      return {
         success: true,
         result: result,
         status: HttpStatus.OK,
         msg: null
      }
   }

   @Get('detail')
   async detail(@Query() query): Promise<any> {
      const result = await this.articleService.getArticleDetail(query);
      return {
         success: true,
         result: result,
         status: HttpStatus.OK,
         msg: null
      }
   }

   @Get('recommendRead')
   async recommendRead(@Query() query): Promise<any> {
      const result = await this.articleService.getRecommendRead(query);
      return {
         success: true,
         result: result,
         status: HttpStatus.OK,
         msg: null
      }
   }

} 