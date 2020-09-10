import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { jwtConstants } from './constans';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ){ super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secret
    }) }
    
    /**
     * 抽象方法，校验jwt是否通过
     * 内部会自动将header中的token校验并解析，得到payload
     * 只有token有效才会执行, 过期、无效都不会执行
     * @author zhou.c
     * @date 2020-09-10
     * @param {any} payload
     * @returns {any} 
     */
    async validate(payload) {
       const user = await this.authService.validateUser(payload);
       if (!user){
            throw new UnauthorizedException({
               success: true,
               result: '',
               status: HttpStatus.OK,
               msg: '此账号状态异常，请重新登录或注册!'
            });
       }
       return user;
    }
    
}