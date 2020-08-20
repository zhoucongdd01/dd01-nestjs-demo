import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService{
  constructor(
      @InjectRepository(Article)
      private readonly articleRepository: Repository<Article>,
  ) {}

  // 创建文章
  async create(article: Article): Promise<Article>{
    const newArticle = await this.articleRepository.create(article);
    await this.articleRepository.save(newArticle);
    return newArticle;
  }

  // 获取文章列表
  async findAll(): Promise<Article[]>{
    const newArticle = await this.articleRepository.find();
    return newArticle;
  }

}