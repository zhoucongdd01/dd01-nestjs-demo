import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';

// 用户模块
import { UserModule } from './modules/user/user.module';
import { User } from './modules//user/user.entity';

// 菜单模块
import { MenuModule } from './modules/menu/menu.module';
import { Menu, SubMenu } from './modules/menu/menu.entity';

// 文章模块
import { ArticleModule } from './modules/article/article.module';
import { Article } from './modules/article/article.entity';

// 分类模块
import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/category.entity';

// 评论模块
import { CommentModule } from './modules/comment/comment.module';
import { Comment } from './modules/comment/comment.entity';

// 轮播图模块
import { BannerModule } from './modules/banner/banner.module';
import { Banner } from './modules/banner/banner.entity';

// jwt模块
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...config.mysql,
      entities: [
        User,
        Menu,
        SubMenu,
        Article,
        Category,
        Comment,
        Banner
      ]
    }),
    UserModule,
    MenuModule,
    ArticleModule,
    CategoryModule,
    CommentModule,
    BannerModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly Connection: Connection) {}
}
