import { Injectable, Query } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { customAlphabet } from 'nanoid';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService{
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  
  async saveComment(data: Comment): Promise<any> {
    data.comment_id = Number(customAlphabet('1234567890', 5)());
    data.star_users = '';
    data.star_count = 0;
    const comment = await this.commentRepository.save(data)
    return comment;
  }

  async getArticleCommentList(query): Promise<Comment[]> {
    const comments = await this.commentRepository.createQueryBuilder('comment').
    where({article_id: query.article_id}).leftJoinAndSelect('comment.User', 'User').
    orderBy('comment.star_count', 'DESC').getMany()
    return comments;
  }
  
  // 评论点赞
  async CommentStar(data): Promise<any> {
    const comment = await this.commentRepository.createQueryBuilder('comment')
    .where({comment_id: data.comment_id}).getOne();
    let star_users = '';
    let star_count = comment.star_count;
    if (comment.star_users) {
      if (comment.star_users.indexOf(data.user_id) === -1) {
        star_users = comment.star_users + ',' + data.user_id;
        star_count += 1;
      } else {
        star_users = comment.star_users;
      }
    } else {
      star_users = data.user_id;
      star_count += 1
    }
    await this.commentRepository.createQueryBuilder('comment').
    update(Comment).set({star_users:star_users, star_count: star_count}).where({comment_id: data.comment_id}).execute();
    return comment;
  }
}