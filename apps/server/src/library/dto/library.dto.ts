import { IsString, IsNotEmpty, IsOptional, IsNumber, isNotEmpty, IsInt, Min } from 'class-validator';

export class getLibraryDto{
  @IsString()
  @IsOptional()
  sentence: string;

  @IsString()
  @IsOptional()
  status: "pre" | "ing" | "end";

  @IsString()
  @IsOptional()
  classId: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  pageNo: number = 0; // 默认为第0页

  @IsInt()
  @Min(1)
  @IsOptional()
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
  review: "0" | "1" | "2" | "3" | "4" | "5" | "7" | "15";

  @IsString()
  @IsOptional()
  status: "pre" | "ing" | "end";

  @IsString()
  @IsOptional()
  classId: string;
}
