import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { getLibraryDto, addLibraryDto } from "./dto";

@Injectable({})
export class LibraryService {
  constructor(private prisma: PrismaService) { }

  async getLibrary(userId: string, dto: getLibraryDto) {
    const { classId = null, status = null, sentence = null, pageNo = 0, pageSize = 10 } = dto;
    console.log("userId:", userId, "dto:", dto)

    try {
      const libraries = await this.prisma.library.findMany({
        where: {
          userId: userId,
          ...(classId ? { classId: classId } : {}),  // 仅在 classId 存在时添加
          ...(status ? { status: status } : {}),     // 仅在 status 存在时添加
          ...(sentence ? { sentence: { contains: sentence } } : {}),  // 仅在 sentence 存在时进行模糊搜索
        },
        skip: pageNo * pageSize,
        take: pageSize,
      });

      return {
        statusCode: 200,
        message: "Library get successful!",
        data: libraries
      }
    } catch (error) {
      console.log("library get error:", error)
      return error
    }
  }


  async addLibrary(userId: string, dto: addLibraryDto) {

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
          classId: dto.classId ? dto.classId : "default"
        }
      })

      return {
        statusCode: 200,
        message: "Library created successful!",
        data: library
      }
    } catch (error) {
      console.log("library create error:", error)
      throw error
    }
  }
}