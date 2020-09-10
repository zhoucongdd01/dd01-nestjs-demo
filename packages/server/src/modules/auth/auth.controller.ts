import { Controller, Post, HttpStatus, Body } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
   constructor(
       private readonly userService: UserService,
       private readonly authService: AuthService
   ){}

   @Post('login')
   async login(@Body() user){
    const result = await this.userService.selectUser(user);
    if (result) {
      if (result.password !== user.password) {
        return {
          success: true,
          result: '',
          status: HttpStatus.OK,
          msg: '密码错误!'
        }
      } else {
        const userinfo = await this.authService.createAccountToken(result);
        return {
          success: true,
          result: userinfo,
          status: HttpStatus.OK,
          msg: null
        }
      }
    } else {
      return {
        success: true,
        result: '',
        status: HttpStatus.OK,
        msg: '账号不存在!'
      }
    }
   }
}
