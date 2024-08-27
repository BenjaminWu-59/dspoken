import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.moudule';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    AuthModule, 
    UserModule
  ]
})
export class AppModule {}
    