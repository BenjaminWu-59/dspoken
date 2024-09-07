import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { getLibraryDto, addLibraryDto } from "./dto";

@Injectable({})
export class LibraryService {
  constructor(private prisma: PrismaService) { }

  async getLibrary(userId: string, dto: getLibraryDto) {
    const { classId, status, review, sentence, pageNo = 0, pageSize = 10 } = dto;
    
    try {
      const whereCondition = {
        userId,
        ...(classId && { classId }), // classId 存在时则作为条件
        ...(status && { status }),
        ...(review && { review }),
        ...(sentence && { sentence: { contains: sentence } }),
      };
  
      const [libraries, totalCount] = await Promise.all([
        this.prisma.library.findMany({
          where: whereCondition,
          skip: pageNo * pageSize,
          take: pageSize,
        }),
        this.prisma.library.count({ where: whereCondition })
      ]);
  
      return {
        statusCode: 200,
        message: "get library success!",
        data: {
          libraries,
          totalCount,
          pageNo,
          pageSize
        }
      };
    } catch (error) {
      console.error("get library error:", error);
      throw new Error("get library error");
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