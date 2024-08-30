import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto, SigninDto } from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    console.log(dto)
    return this.authService.signup(dto)
  }

  @HttpCode(HttpStatus.OK) // 决定返回状态的装饰器
  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto)
  }
}