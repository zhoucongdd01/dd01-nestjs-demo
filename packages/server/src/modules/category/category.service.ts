import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { Article } from '../article/article.entity';

@Injectable()
export class CategoryService{
  constructor(
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>,
      @InjectRepository(Article)
      private readonly acticleRepository: Repository<Article & {count: number}>,
  ) {}

  async create(body) {
     await this.categoryRepository.save(body)
     return body
  }

  // 获取分类列表
  async findAll(): Promise<Category[]>{
    const categorys = await this.categoryRepository.
    createQueryBuilder('category').
    leftJoinAndSelect('category.articles', 'article').
    getMany();
    return categorys.map(category => {
        return {
            ...category,
            total: category.articles.length,
        }
    })
  }
}