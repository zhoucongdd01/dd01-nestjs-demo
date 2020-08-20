import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './article.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  exports: [ArticleService],
  controllers: [ArticleController],
  providers: [ArticleService]
})

export class ArticleModule{}