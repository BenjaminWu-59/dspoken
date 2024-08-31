import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: diskStorage({
            //文件储存位置
            destination: process.env.UPLOAD_FILE,
            //文件名定制
            filename: (req, file, callback) => {
              const name = new Date().getTime() + file.originalname
              callback(null, name)
            },
          }),
        }
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule { }