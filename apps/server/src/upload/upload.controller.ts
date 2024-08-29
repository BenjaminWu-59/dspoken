import { Controller, Get, Post, UploadedFile, UseInterceptors, Res, HttpStatus } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';
import * as multer from 'multer';

// 设置存储配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 指定上传文件的目录
    cb(null, path.join(__dirname, '../../../../../dspoken_uploads'));
  },
  filename: (req, file, cb) => {
    // 自定义文件名，保持原始名称
    cb(null, file.originalname);
  },
});

@Controller('try')
export class UploadController {
  // 文件上传的路由
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { status: HttpStatus.BAD_REQUEST, message: 'File upload failed' };
    }
    return { status: HttpStatus.OK, message: 'File uploaded successfully', filename: file.filename };
  }

  // 文件读取的路由
  @Get('getfile')
  getFile(@Res() res: Response) {
    const directoryPath = path.join(__dirname, '../../../../../dspoken_uploads');
    const filePath = path.join(directoryPath, 'avatar_1.jpg');

    // 检查文件是否存在
    if (fs.existsSync(filePath)) {
      // 读取文件内容
      const fileStream = fs.createReadStream(filePath);

      // 设置响应头
      res.setHeader('Content-Type', 'image/jpeg');

      // 通过流的方式发送文件内容
      fileStream.pipe(res);
    } else {
      // 文件不存在时返回 404
      res.status(404).send('File not found');
    }
  }
}