import { Controller, Get, Post, HttpException, HttpStatus, Body, Request, Req, Query, Headers} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async register(@Body() user: Partial<UserEntity>, @Headers() header) {
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

}
 