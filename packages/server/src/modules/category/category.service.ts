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
      private readonly acticleRepository: Repository<Article>,
  ) {}

  // 获取分类列表
  async findAll(): Promise<Category[]>{
    const newCategory = await this.categoryRepository.find();
    const totolCategory = await this.acticleRepository.createQueryBuilder('article').
    select('category_id').addSelect('count(*)', 'count').groupBy('article.category_id').getRawMany();
    return newCategory.map(category => {
        const currentCategory = totolCategory.find(item => 
            item.category_id === category.category_id);
        const totol = currentCategory && currentCategory.count || 0
        return {
            ...category,
            totol: totol
        }
    })
  }
}