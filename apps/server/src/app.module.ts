import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { FileModule } from './file/file.module';
import { LibraryModule } from './library/library.module';
import { ClassesModule } from './classes/classes.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    AuthModule, 
    UserModule,
    LibraryModule,
    ClassesModule,
    FileModule
  ]
})
export class AppModule {}
    