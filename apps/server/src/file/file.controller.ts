import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  HttpStatus,
  Param,
  UseGuards,
  Body
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

  @UseGuards(JwtGuard)
  @Post('upload')
  @FileFilter('file', {
    limits: {
      fileSize: 5 * 1024 * 1024, // 增加文件大小限制到5MB
    },
    fileFilter: FiletypeFilter('image/jpeg', 'image/png', 'audio/mpeg'),
  })
  async fileUpload(@UploadedFile() file, @Body('path') customPath: string) {
    const uploadDir = this.config.get<string>('UPLOAD_FILE');
    let filePath = uploadDir;

    if (customPath) {
      filePath = path.join(uploadDir, customPath);
      await fs.promises.mkdir(filePath, { recursive: true });
    }

    const fullPath = path.join(filePath, file.filename);
    await fs.promises.rename(file.path, fullPath);

    return {
      statusCode: 200,
      message: '文件上传成功',
      filename: this.config.get("DEFAULT_URL") + "file/" + (customPath ? customPath + '/' : '') + file.filename,
    };
  }

  @Get('/:filename(*)')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const uploadDir = this.config.get<string>('UPLOAD_FILE');
    const filePath = path.join(uploadDir, filename);

    if (await fs.promises.access(filePath).then(() => true).catch(() => false)) {
      const fileStream = fs.createReadStream(filePath);
      const mimeType = path.extname(filePath) === '.mp3' ? 'audio/mpeg' : 'image/jpg';
      res.setHeader('Content-Type', mimeType);
      fileStream.pipe(res);
    } else {
      res.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        error: "未找到文件",
        message: '文件不存在',
      });
    }
  }
}

