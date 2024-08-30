import { ForbiddenException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { EditUserDto } from "./dto"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async editUser(
    userId: number,
    dto: EditUserDto
  ) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          ...dto,
        }
      })

      delete user.hash

      return user
    } catch (error) {
      console.log("error:", error)
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.meta.target[0] === "email") {
          throw new ForbiddenException('修改失败，该邮箱已被注册!')
        } else {
          throw new ForbiddenException('修改失败，该名称已被注册!')
        }
      }
      throw error
    }
  }
}