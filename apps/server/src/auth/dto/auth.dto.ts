import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  emailOrName: string; // 这里可以是邮箱或名称

  @IsString()
  @IsNotEmpty()
  password: string;
}