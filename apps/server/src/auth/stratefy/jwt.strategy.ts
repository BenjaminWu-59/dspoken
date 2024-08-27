// src/auth/stratefy/jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt'
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET')
    })
  }

  async validate(payload: any) {
    /*
      payload 通常是指在处理 JWT（JSON Web Token）时，从令牌中提取的数据。
      这些数据在 JWT 中作为有效载荷部分，包含了用户的相关信息，如用户 ID、角色、权限等。
    */
      const user =
      await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
    delete user.hash;
    return user;
  }
}