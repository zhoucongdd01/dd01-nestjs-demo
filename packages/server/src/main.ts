import { NestFactory } from '@nestjs/core';
import * as serveStatic from 'serve-static';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
var path = require('path');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use('/uploads', serveStatic(path.join(__dirname, '../uploads')))
  app.enableCors();
  await app.listen(3302);
}
bootstrap();
