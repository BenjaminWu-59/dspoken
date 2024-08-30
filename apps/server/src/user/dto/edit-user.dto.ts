import { IsEmail, IsOptional, IsString } from "class-validator"

export class EditUserDto{
  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  name?: string

  phone?:string
  gender?:string
  age?:number  
  avatar?: string
}