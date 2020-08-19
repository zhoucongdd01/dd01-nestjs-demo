import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm';
import { AvatarEntity } from './avatar.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(AvatarEntity)
        private readonly avatarRepository: Repository<AvatarEntity>
    ) {}
    
    
    async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
        const newUser = await this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async saveAvatar(avatar: Partial<AvatarEntity>): Promise<AvatarEntity> {
        const newAvatar = await this.avatarRepository.create(avatar);
        await this.avatarRepository.save(newAvatar);
        return newAvatar
    }

    async findAll(){
       const users = await this.userRepository.createQueryBuilder('user_entity').innerJoinAndSelect('user_entity.avatar', 'avatar').getOne()
       return users
    }
}
