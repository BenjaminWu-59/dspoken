import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  private uploadPath: string;

  constructor(private configService: ConfigService) {
    this.uploadPath = this.configService.get<string>('UPLOAD_FILE');
  }

  async getMulterStorage() {
    return {
      storage: diskStorage({
        //文件储存位置
        destination: 'uploads',
        //文件名定制
        filename: (req, file, callback) => {
          const name = new Date().getTime() + file.originalname
          callback(null, name)
        },
      }),
    }
  }
}