// src/auth/dto/auth.dto.ts
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


// 这里使用了 nestjs 中的pipes 去做验证,（包为：class-validator class-transformer）
// 这种验证需要在首页main.ts中进行引用的配置
export class AuthDto{
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}