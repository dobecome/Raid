import { Injectable } from "@nestjs/common";
import e from "express";
import { GlobalService } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBossRaidDto } from "./dto/create-boss-raid.dto";
import { UpdateBossRaidDto } from "./dto/update-boss-raid.dto";

@Injectable()
export class BossRaidsService {
  constructor(private prisma: PrismaService) {}

  async initBossRaid() {
    const bossRaid = await this.prisma.bossRaid.create({
      data: {
        canEnter: true,
      },
    });
    return bossRaid;
  }

  async getBossRaidStatus() {
    const status = await this.prisma.bossRaid.findFirst({
      select: {
        canEnter: true,
        enteredUserId: true,
      },
    });
    return status;
  }

  checkBossRaidStatus() {
      const BOSS_RAID_DATA = Object.values(GlobalService.bossRaidData)[0][0];
      const bossRaidLimitSeconds = BOSS_RAID_DATA.bossRaidLimitSeconds;
      let lastSeconds = Date.now() - (bossRaidLimitSeconds * 1000);
      let date = new Date(lastSeconds).toISOString();
      this.prisma.bossRaidRecord.deleteMany({
        where:{
          createdAt:{
            gte: date,
          }
        }
      })
  }

  async postBeginBossRaid(body: { userId: number; level: number }) {
    // this.checkBossRaidStatus()

    const status = await this.prisma.bossRaid.findFirst();

    if (status.canEnter) {
      //보스 레이드 시작한 경우, 다른 유저가 입장하지 못하도록 bossRaid canEnter false 처리
      await this.prisma.bossRaid.update({
        data: {
          canEnter: false,
        },
        where: {},
      });

      // 보스 레이드 시작 가능한 경우, S3 level/score 데이터 기반으로 bossRaidRecord 생성
      const BOSS_RAID_DATA = Object.values(GlobalService.bossRaidData)[0][0];
      // const bossRaidLimitSeconds = BOSS_RAID_DATA.bossRaidLimitSeconds;
      const scoreByLevel = BOSS_RAID_DATA.levels.find(
        (e) => +e.level === +body.level
      ).score;

      const bossRaidRecord = await this.prisma.bossRaidRecord.create({
        data: {
          userId: body.userId,
          bossRaidId: status.id,
          level: body.level,
          score: scoreByLevel,
          isDone: false,
        },
      });

      // * 보스레이드 종료하지 못하고 bossRaidLimitSeconds가 지나버리면 bossRaidRecord 예외처리하여 delete 해야함 *
      // 이벤트 처리 시점? - 보스레이드 상태 조회할 때 또는 누군가 보스레이드 시작 요청할 때

      const result = {
        RaidRecordId: bossRaidRecord.id,
        isEntered: true,
      };

      return result;
    } else {
      // 보스 레이드 시작 불가능 한 경우, isEntered false 리턴
      const result = {
        isEntered: false,
      };
      return result;
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} bossRaid`;
  // }

  // update(id: number, updateBossRaidDto: UpdateBossRaidDto) {
  //   return `This action updates a #${id} bossRaid`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bossRaid`;
  // }
}
