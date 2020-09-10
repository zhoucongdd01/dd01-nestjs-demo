import { Injectable } from '@nestjs/common';
// import svgCaptcha from 'svg-captcha';
import { InjectRepository } from '@nestjs/typeorm';
import { customAlphabet } from 'nanoid';
import { User } from './user.entity';
import { Repository } from 'typeorm';

var svgCaptcha = require('svg-captcha')

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    
    async findOneByUserName(username: string): Promise<User> {
        const user = await this.userRepository.createQueryBuilder().
        where({username: username}).getOne();
        return user;
    }
    
    async selectUser(user: Partial<User & {account: string}>): Promise<User> {
        const newUser = await this.userRepository.createQueryBuilder().
        where({username: user.account}).getOne()
        return newUser;
    }

    async createUser(user: Partial<User & {account: string}>): Promise<User> {
        user.user_id = Number(customAlphabet('1234567890', 4)());
        const newUser = await this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async findAll(){
       const users = await this.userRepository.find()
       return users
    }
    
    // 生成随机验证码
    async getTestCode() {
        const cap = svgCaptcha.create({
            size: 4, // 验证码长度
            width:160,
            height:60,
            fontSize: 50,
            ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
            noise: 2, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#eee' // 验证码图片背景颜色
        })
        let img = cap.data // 验证码
        let text = cap.text.toLowerCase() // 验证码字符，忽略大小写
        return {img, text};
    }
}
