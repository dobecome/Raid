import { Injectable } from "@nestjs/common";
import { GlobalService } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";

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

  async checkBossRaidStatus() {
    const row = await this.prisma.bossRaidRecord.findMany({
      where: {
        isDone: false,
      },
    });

    if (row.length > 0) {
      // 현재 진행중인 보스레이드가 있는 경우,
      // ex) 10분에 시작된 보스레이드는 13분 이후에는 삭제한다
      const BOSS_RAID_DATA = Object.values(GlobalService.bossRaidData)[0][0];
      const bossRaidLimitSeconds = BOSS_RAID_DATA.bossRaidLimitSeconds;
      let lastSeconds = Date.now() - bossRaidLimitSeconds * 1000;
      let date = new Date(lastSeconds).toISOString(); // 현재 시점 기준 180초 이전의 Date
      const count = await this.prisma.bossRaidRecord.deleteMany({
        where: {
          createdAt: {
            lte: date,
          },
        },
      });

      if (count.count > 0) {
        await this.prisma.bossRaid.updateMany({
          data: {
            canEnter: true,
          },
          where: {
            canEnter: false,
          },
        });
      }
      // 3분 초과한 보스레이드가 없으면 입장 불가능 상태 유지
    } else {
      // 진행중인 보스레이드가 없으면 입장 가능
      await this.prisma.bossRaid.updateMany({
        data: {
          canEnter: true,
        },
      });
    }
  }

  async postBeginBossRaid(body: { userId: number; level: number }) {
    await this.checkBossRaidStatus();

    const status = await this.prisma.bossRaid.findFirst();

    if (status.canEnter) {
      //보스 레이드 시작한 경우, 다른 유저가 입장하지 못하도록 bossRaid canEnter false 처리
      await this.prisma.bossRaid.updateMany({
        data: {
          canEnter: false,
          enteredUserId: +body.userId,
        },
        where: {
          canEnter: true,
        },
      });

      // 보스 레이드 시작 가능한 경우, S3 level/score 데이터 기반으로 bossRaidRecord 생성
      const BOSS_RAID_DATA = Object.values(GlobalService.bossRaidData)[0][0];
      // const bossRaidLimitSeconds = BOSS_RAID_DATA.bossRaidLimitSeconds;
      const scoreByLevel = BOSS_RAID_DATA.levels.find(
        (e) => +e.level === +body.level
      ).score;

      const bossRaidRecord = await this.prisma.bossRaidRecord.create({
        data: {
          userId: +body.userId,
          bossRaidId: +status.id,
          level: +body.level,
          score: parseInt(scoreByLevel),
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

  async patchEndBossRaid(body: { userId: number; raidRecordId: number }) {
    // 보스레이드 종료 조건 : 제한시간 3분이 지나지 않은 보스레이드만 종료시킬 수 있음
    const BOSS_RAID_DATA = Object.values(GlobalService.bossRaidData)[0][0];
    const bossRaidLimitSeconds = BOSS_RAID_DATA.bossRaidLimitSeconds;
    let lastSeconds = Date.now() - bossRaidLimitSeconds * 1000;
    let date = new Date(lastSeconds).toISOString(); // 현재 시점 기준 180초 이전의 Date
    // 
    const bossRaid = await this.prisma.bossRaidRecord.updateMany({
      data: {
        isDone: true,
      },
      where: {
        id: +body.raidRecordId,
        userId: +body.userId,
        isDone: false,
        createdAt: {
          gte: date,
        },
      },
    });

    if (bossRaid.count > 0) {
      // 유저 현재 점수 + 보스레이드 종료 점수 구하기
      const score = await this.prisma.user.findFirst({
        select: {
          totalScore: true,
        },
        where: {
          id: +body.userId,
        },
      });
      const scoreByLevel = await this.prisma.bossRaidRecord.findFirst({
        select: {
          score: true,
        },
        where: {
          id: +body.raidRecordId,
        },
      });

      // 합산 점수 저장
      await this.prisma.user.update({
        data: {
          totalScore: score.totalScore + scoreByLevel.score,
        },
        where: {
          id: +body.userId,
        },
      });

      // bossRaid 입장 가능상태로 변경
      await this.prisma.bossRaid.updateMany({
        data:{
          canEnter:true
        },
      })
      
      //redis client로 total score 저장시키는 로직 개발해야함

      return {};
    } else {
      return {
        result: "보스레이드 참여 정보를 찾을 수 없습니다.",
      };
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
