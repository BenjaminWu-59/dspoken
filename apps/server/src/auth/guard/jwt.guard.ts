import { AuthGuard } from "@nestjs/passport";

 /*
     auth/strategy/jwt.strategy.ts
     中的PassportStrategy中的第二个参数相通，意味着使用那里的守卫策略
  */
export class JwtGuard extends AuthGuard('jwt') {
  constructor(){
    super();
  }
}