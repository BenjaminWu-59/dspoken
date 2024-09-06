import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { addClassesDto } from "./dto";

@Injectable({})
export class ClassesService {
  constructor(private prisma: PrismaService) { }

  async addClasses(userId: string, dto: addClassesDto) {
    try {
      const classes = await this.prisma.classes.create({
        data: {
          name: dto.name,
          note: dto.note,
          userId: userId,
        }
      })

      return {
        statusCode: 200,
        message: "Classes created successful!",
        data: classes
      }
    } catch (error) {
      console.log("error:", error)
      throw error
    }
  }
}