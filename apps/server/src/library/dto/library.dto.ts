import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsNumber, isNotEmpty, IsInt, Min, IsIn } from 'class-validator';

export class getLibraryDto {
  @IsString()
  @IsOptional()
  id:string

  @IsString()
  @IsOptional()
  sentence: string;

  @IsString()
  @IsOptional()
  @IsIn(['pre', 'ing', 'end'])
  status: string;

  @IsString()
  @IsOptional()
  @IsIn(['0', '1', '2', '3', '4', '5', '7', '15'])
  review: string;

  @IsString()
  @IsOptional()
  classId: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10)) // 转换为整数
  pageNo: number = 0; // 默认为第0页

  @IsNumber()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10)) // 转换为整数
  pageSize: number = 10; // 默认为每页10条
}

export class addLibraryDto {
  @IsString()
  @IsNotEmpty()
  hint: string;

  @IsString()
  @IsNotEmpty()
  sentence: string;

  @IsString()
  @IsOptional()
  classId: string;
}


export class updateLibraryDto{
  @IsString()
  @IsNotEmpty()
  id:string

  @IsString()
  @IsOptional()
  hint: string;

  @IsString()
  @IsOptional()
  sentence: string;

  @IsString()
  @IsOptional()
  classId: string;

  @IsString()
  @IsOptional()
  @IsIn(['pre', 'ing', 'end'])
  status: string;

  @IsString()
  @IsOptional()
  @IsIn(['0', '1', '2', '3', '4', '5', '7', '15'])
  review: string;
}