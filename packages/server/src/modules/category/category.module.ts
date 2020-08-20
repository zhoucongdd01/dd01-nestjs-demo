import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { Article } from '../article/article.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Category, Article])],
  exports: [CategoryService],
  controllers: [CategoryController],
  providers: [CategoryService]
})

export class CategoryModule{}