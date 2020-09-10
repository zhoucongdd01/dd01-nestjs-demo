import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';




@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  exports: [CommentService],
  controllers: [CommentController],
  providers: [CommentService]
})

export class CommentModule{}