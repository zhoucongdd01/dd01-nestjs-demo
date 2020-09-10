import { Controller, Get, Post, Body, HttpException, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';

@Controller('Comment')
export class CommentController{
   constructor(
      private readonly CommentService: CommentService
   ) {}
   
   // 提交评论
   @UseGuards(AuthGuard('jwt'))
   @Post('commit')
   async commit(@Body() data): Promise<any> {
     const result = await this.CommentService.saveComment(data)
      return {
         success: true,
         result: result,
         status: HttpStatus.OK,
         msg: null
      }
   }

   // 获取文章评论列表
   @Get('getComments')
   async getComments(@Query() query): Promise<any> {
      const result = await this.CommentService.getArticleCommentList(query)
       return {
          success: true,
          result: result,
          status: HttpStatus.OK,
          msg: null
       }
   }
   
   // 评论点赞
   @UseGuards(AuthGuard('jwt'))
   @Post('CommentStar')
   async CommentStar(@Body() data): Promise<any> {
      const result = await this.CommentService.CommentStar(data)
       return {
          success: true,
          result: '',
          status: HttpStatus.OK,
          msg: null
       }
   }
   
} 