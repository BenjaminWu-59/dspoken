import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { LibraryService } from "./library.service";
import { addLibraryDto, getLibraryDto } from "./dto";


@UseGuards(JwtGuard) // 路由守卫提升，里面直接使用我们之前定义的JwtGuard类
@Controller('library')
export class LibraryController {
  constructor(
    private libraryService: LibraryService,
  ) { }

  @HttpCode(HttpStatus.OK) 
  @Get('/')
  async getLibrary(@GetUser('id') userId: string, @Body() dto: getLibraryDto) {
    return this.libraryService.getLibrary(userId, dto)
  }
  
  @HttpCode(HttpStatus.OK) // 决定返回状态的装饰器
  @Post('/')
  async addLibrary(@GetUser('id') userId: string, @Body() dto: addLibraryDto) {
    return this.libraryService.addLibrary(userId, dto)
  }
}