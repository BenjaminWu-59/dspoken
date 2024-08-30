import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator"
import { Transform } from 'class-transformer';

export class EditUserDto{
  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  phone?:string

  @IsString()
  @IsOptional()
  gender?:string

  @Transform(({ value }) => value ? parseInt(value, 10) : null)
  @IsNumber()
  @IsOptional()
  age?:number 
  
  @IsString()
  @IsOptional()
  avatar?: string
}

/*
password:"12134"
hash: $argon2id$v=19$m=65536,t=3,p=4$MaweE+tp3KaaBGIR3Z7WWw$uQH5xkUXQU/zi2H4G1q6tj/Rd0Umvs1ARmErfVmPpMQ
*/