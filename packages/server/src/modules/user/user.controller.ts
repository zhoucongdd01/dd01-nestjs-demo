import { Controller, Get, Post, HttpException, HttpStatus, Body, Request, Req, Query, Headers} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity'

@Controller('user')
export class UserController {
  testCode = null;
  constructor(private readonly userService: UserService) { }
  @Post('register')
  async register(@Body() user: Partial<UserEntity & {code: string}>, @Headers() header) {
    console.log(this.testCode.text, user.code)
    if (user.code !== this.testCode.text) {
      throw new HttpException('验证码不正确', HttpStatus.FORBIDDEN);
    }
    return await this.userService.createUser(user)
  }

  @Post('SaveAvatar')
  async SaveAvatar(@Body() body) {
    return await this.userService.saveAvatar(body)
  }

  @Get('list')
  list(@Query() query){
    return this.userService.findAll()
  }
  
  @Get('getTestCode')
  async getTestCode() {
    this.testCode = await this.userService.getTestCode();
    return this.testCode.img;
  }

}
 