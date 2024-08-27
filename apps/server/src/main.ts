import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // 全局使用 pipe 管道验证
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true // 此方法将对多余字段进行过滤
  }))

  app.enableCors({
    origin: 'http://localhost:5001', // 允许的来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 如果需要支持凭据（如 cookies）
  });
  
  await app.listen(5002);
}
bootstrap();
