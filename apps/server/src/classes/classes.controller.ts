import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { ClassesService } from "./classes.service";
import { addClassesDto } from "./dto";

@UseGuards(JwtGuard) // 路由守卫提升，里面直接使用我们之前定义的JwtGuard类
@Controller('classes')
export class ClassesController {
  constructor(
    private libraryService: ClassesService,
  ) { }
  
  @HttpCode(HttpStatus.OK) // 决定返回状态的装饰器
  @Post('/')
  async addLibrary(@GetUser('id') userId: string, @Body() dto: addClassesDto) {
    return this.libraryService.addClasses(userId, dto)
  }
}