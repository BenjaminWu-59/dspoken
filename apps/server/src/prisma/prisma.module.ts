import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global() // 和 Module 中的 exports 联合，将此服务变成全局的服务
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }