import { Injectable } from "@nestjs/common";
import { GlobalService } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        totalScore: 0,
      },
    });
    return user.id;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      select: {
        totalScore: true,
        bossRaidRecords: true,
      },
      where: {
        id,
      },
    });
    return user;
  }

  // findAll() {
  //   return '';
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
