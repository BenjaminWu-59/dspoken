// src/user/user.controller.ts
import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { EditUserDto } from "./dto";
import { UserService } from "./user.service";

@UseGuards(JwtGuard) // 路由守卫提升，里面直接使用我们之前定义的JwtGuard类
@Controller('user')
export class UserController {
  constructor(private userService: UserService){}
  /*
     本路由将使用路由守卫策略, 这里的验证逻辑与 auth/strategy/jwt.strategy.ts
     中的PassportStrategy中的第二个参数validate相通，意味着使用那里的守卫策略
  */
  @Get('me')
  getMe(@GetUser() user: User) {  //, @GetUser('email') email: string
    // 请求变成GetUser装饰器，这里将带参数的第二个GetUser返回，我们可以直接拿到对应的字段的值
    // console.log("user/me:", user)

    return user
  }

  @Patch()
  editUser(
    @GetUser('id') userId: string, //这里的id由JwtGuard解析
    @Body() dto: EditUserDto
  ){
    return this.userService.editUser(userId, dto)
  }
}

