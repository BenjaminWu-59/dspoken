import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignupDto, SigninDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService, // 新增代码
    private config: ConfigService // 新增代码
  ) { }

  /*--------- 用户注册 ----------*/
  async signup(dto: SignupDto) {
    // 生成密码hash值
    const hash = await argon.hash(dto.password)
    try { // 这里使用了try catch 进行错误捕捉
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          hash
        }
      })

      // 不暴露hash值
      delete user.hash

      // 密码正确，返回Token
      return this.signToken(user.id, user.email)
    } catch (error) {
      console.log(error)
      // prisma 错误单独处理，这里处理的是email重复的问题
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target[0] === "email") {
            throw new ForbiddenException('该邮箱已被注册!')
          } else {
            throw new ForbiddenException('该名称已被注册!')
          }
        }
      }
      // 其他错误直接抛出
      throw error
    }
  }

  async signin(dto: SigninDto) {
    // 通过邮箱或姓名找出用户
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.emailOrName },
          { name: dto.emailOrName },
        ],
      },
    });

    // 用户不存在，抛出异常
    if (!user) {
      throw new ForbiddenException('用户不存在(Credentials incorrect)')
    }

    // 对比密码
    const pwMatches = await argon.verify(
      user.hash,
      dto.password
    )

    // 密码错误，抛出异常
    if (!pwMatches) {
      throw new ForbiddenException('密码错误(Credentials don\'t match)')
    }

    // 密码正确，返回Token
    return this.signToken(user.id, user.email)
  }

  /*--------- 用户鉴权 ----------*/ // 新增代码
  async signToken(
    userId: string,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email
    }

    const secret = this.config.get('JWT_SECRET')

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '7d', // token 有效时间为15min, 15min后失效则用户无法调用其他接口
      secret: secret
    })

    return { access_token: token }
  }
}


