import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class addClassesDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  note: string;
}