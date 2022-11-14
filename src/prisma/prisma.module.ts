import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//Global innotation 선언으로 각각의 서비스에서 import 해주지 않아도 사용 가능
@Global()
@Module({
  providers: [PrismaService],
  exports:[PrismaService]
})
export class PrismaModule {}
