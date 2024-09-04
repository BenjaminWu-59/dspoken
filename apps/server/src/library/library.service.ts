import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LibraryDto } from "./dto";

@Injectable({})
export class LibraryService {
  constructor(private prisma: PrismaService) { }

  async addLibrary(userId: string, dto: LibraryDto) {

    try {
      const maxNumber = await this.prisma.library.findFirst({
        where: { userId },
        orderBy: { number: 'desc' },
        select: { number: true },
      });

      const number = maxNumber ? maxNumber.number + 1 : 1;

      const library = await this.prisma.library.create({
        data: {
          hint: dto.hint,
          sentence: dto.sentence,
          number: number,
          userId: userId,
          review: "0",
          status: "pre",
          classId: dto.classId ? dto.classId : null
        }
      })

      return {
        statusCode: 200,
        message: "Library created successful!",
        data: library
      }
    } catch (error) {
      console.log("library create error:", error)
      return error
    }
  }
}