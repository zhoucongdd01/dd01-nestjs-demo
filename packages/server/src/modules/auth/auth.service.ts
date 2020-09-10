import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constans';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}
    
    /**
     * 创建account_token
     * @author zhou.c
     * @date 2020-09-10
     * @param {any} user:User 登录或注册提交的用户信息
     * @returns {any} account_token
     */
    async createAccountToken(user: User): Promise<{}> {
      const payload = {username: user.username, 
        user_id: user.user_id, avatar: user.avatar, email: user.email }
      const account_token = this.jwtService.sign(payload);
      return {
        account_token,
        expires: jwtConstants.expiresIn,
        ...payload
      }
    }
    
    /**
     * 通过token校验用户信息
     * @author zhou.c
     * @date 2020-09-10
     * @param {User} payload  
     * @returns {any} User
     */
    async validateUser(payload): Promise<any> {
      return await this.userService.findOneByUserName(payload.username);
    }
}
