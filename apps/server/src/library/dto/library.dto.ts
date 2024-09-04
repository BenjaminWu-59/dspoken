import { IsString, IsNotEmpty, IsOptional, IsNumber, isNotEmpty } from 'class-validator';

export class LibraryDto {
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
