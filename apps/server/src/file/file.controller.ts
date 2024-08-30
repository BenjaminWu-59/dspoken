import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  HttpStatus,
  Param,
  UseGuards
} from '@nestjs/common';
import {
  FileFilter,
  FiletypeFilter,
} from "./decorator";
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';
import { JwtGuard } from "src/auth/guard";

@Controller('file')
export class FileController {
  constructor(private config: ConfigService) { }

  @UseGuards(JwtGuard) // 路由守卫提升，里面直接使用我们之前定义的JwtGuard类
  @Post('upload')
  @FileFilter('file', {
    limits: {
      fileSize: 1024 * 1024,
    },
    fileFilter: FiletypeFilter('image/jpeg', 'image/png'),
  })
  fileUpload(@UploadedFile() file) {
    return {
      statusCode: 200,
      message: 'File uploaded successfully',
      filename: file.filename,
    };
  }

  @Get('/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const uploadDir = this.config.get<string>('UPLOAD_FILE');
    const filePath = path.join(uploadDir, filename); // 假设你要读取的文件名是 avatar_1.jpg

    // 检查文件是否存在
    if (fs.existsSync(filePath)) {
      const fileStream = fs.createReadStream(filePath);

      // 设置响应头，根据文件类型调整 Content-Type
      res.setHeader('Content-Type', 'image/jpg');

      // 将文件流通过响应发送
      fileStream.pipe(res);
    } else {
      // 如果文件不存在，返回 404 错误
      res.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        error: "Fail to Found",
        message: '文件不存在',
      });
    }
  }
}

