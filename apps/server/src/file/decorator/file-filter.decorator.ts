import { UnsupportedMediaTypeException, UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

/**
 * 自定义装饰器
 * 
 * @param fieldName 
 * @param options 
 * @returns 
 */
export const FileFilter = (fieldName = 'file', options: MulterOptions = {}) => {
  return applyDecorators(UseInterceptors(FileInterceptor(fieldName, options)))
};

/**
 * 文件类型方法封装
 * 
 * @param types 
 * @returns 
 */
export function FiletypeFilter(...types: string[]) {
  return (req: any, file: any, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (types.some(mime => file.mimetype.includes(mime))) {
      callback(null, true)
    } else {
      callback(new UnsupportedMediaTypeException('文件类型错误'), false)
    }
  }
}
