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
    await this.articleRepository.createQueryBuilder()
    .insert()
    .into(Article)
    .values(article)
    .execute();
    return article;
  }

  // 获取文章列表
  async findAll(query): Promise<{}>{
    let newArticle = null;
    let limit = (query.page_index -1 ) * 5;
    if (!!Number(query.category_id)) {
      newArticle = await this.articleRepository.createQueryBuilder('article').
      where({category_id: query.category_id}).orderBy('article.create_time', 'DESC')
      .skip(limit).take(query.page_size).
      getManyAndCount();
    } else {
      newArticle = await this.articleRepository.createQueryBuilder('article').
      orderBy('article.create_time', 'DESC').skip(limit).take(query.page_size).getManyAndCount();
    }
    return {
      list: newArticle[0],
      total: newArticle[1]
    };
  }
  
  // 获取推荐文章（5条）
  async findRecommend(): Promise<Article[]>{
    let newArticle = await this.articleRepository.createQueryBuilder('article')
    .orderBy('article.create_time', 'DESC').take(5).getMany()
    return newArticle;
  }

  // 获取文章详情
  async getArticleDetail(query): Promise<Article>{
    let article = await this.articleRepository.createQueryBuilder('article')
    .where({article_id: query.article_id}).leftJoinAndSelect('article.Comments', 'Comments').
    leftJoinAndSelect('Comments.User', 'User').getOne()
    return article;
  }

  // 获取推荐阅读
  async getRecommendRead(query): Promise<Article[]>{
    let ArticleList = await this.articleRepository.createQueryBuilder('article')
    .where({category_id: query.category_id}).orderBy('article.create_time', 'DESC').take(3).getMany();
    return ArticleList.filter(item => item.article_id !== query.article_id);
  }

}