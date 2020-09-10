import { Controller, Get, Post, HttpException, HttpStatus, Body,
  UseInterceptors,
  Query, Headers, UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';


var fs = require('fs');
var path = require('path');

@Controller('user')
export class UserController {
  testCode = null;
  constructor(
    private readonly userService: UserService
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // file对应HTML表单的name属性
  async upload(@UploadedFile() file){
    let {buffer,mimetype} = file;
    let fileName = (new Date()).getTime() + Number(Math.random() * 1234);
    let fileType = mimetype.split('/')[1];
    let filePath = path.join(__dirname, '../../../uploads/images/');
    let apath = `http://localhost:3302/uploads/images/${fileName}.${fileType}`;
    const result = await new Promise((resolve, reject) => {
      fs.writeFile( `${filePath}${fileName}.${fileType}`, buffer, (error) => {
        if (error){
         reject()
        } else {
          resolve(apath)
        }
      })
    })
    return {
      success: true,
      result: result,
      status: HttpStatus.OK,
      msg: null
    }
  }

  @Get('list')
  list(@Query() query){
    return this.userService.findAll()
  }
  
  @Get('getTestCode')
  async getTestCode() {
    this.testCode = await this.userService.getTestCode();
    return this.testCode.img
  }

}
 