import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';

// 用户模块
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './modules//user/user.entity';
import { AvatarEntity } from './modules//user/avatar.entity';

// 菜单模块
import { MenuModule } from './modules/menu/menu.module';
import { Menu, SubMenu } from './modules/menu/menu.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...config.mysql,
      entities: [
        UserEntity,
        AvatarEntity,
        Menu,
        SubMenu
      ]
    }),
    UserModule,
    MenuModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly Connection: Connection) {}
}
