import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
   imports: [
     TypeOrmModule.forFeature([User]),
   ],
   exports: [UserService],
   controllers: [UserController],
   providers: [UserService]
})

export class UserModule {};