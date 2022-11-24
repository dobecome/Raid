import { RedisService } from "@liaoliaots/nestjs-redis";
import { Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { PrismaService } from "src/prisma/prisma.service";
import { RankingInfo } from "./entities/ranking-info.entity";
import fetch from "node-fetch";

@Injectable()
export class BossRaidsService {
  private readonly redis: Redis;
  REDIS_RANKING_KEY = "ranking";
  DEFAULT_EXPIRATION = "3600";
  constructor(
    private prisma: PrismaService,
    private readonly redisService: RedisService
  ) {
    this.redis = this.redisService.getClient();
  }

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

  async getRaidSettingsFromRedis() {
    let raidSettings;
    let flag = false;
    await this.redis.get("raidSettings", (err, settings) => {
      if (err) console.error(err);

      if (settings != null) {
        // redis cache data 있을 시 리턴
        // console.log("Cache Hit!");
        raidSettings = JSON.parse(settings);
      } else {
        // redis cache data 없을 시 web url을 fetch 하여 redis 저장
        // console.log("Cache Missed!");
        flag = true;
      }
    });
    if (flag) {
      await fetch(
        "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json",
        { method: "Get" }
      )
        .then((res) => res.json())
        .then((json) => {
          this.redis.setex(
            "raidSettings",
            this.DEFAULT_EXPIRATION,
            JSON.stringify(json)
          );
          raidSettings = json;
        });
    }
    return raidSettings;
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
      // app module에서 서버 구동 시 json데이터를 가져오지 않고, redis cache를 먼저 가져오도록 수정
      const raidSettings = await this.getRaidSettingsFromRedis();
      const bossRaidLimitSeconds =
        raidSettings.bossRaids[0].bossRaidLimitSeconds;
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
    // 보스레이드 시작하기 전에 진행중인 레이드가 있는지 체크해서 3분 지난 레이드는 삭제하고 입장 가능하도록 변경
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
      const raidSettings = await this.getRaidSettingsFromRedis();
      const scoreByLevel = raidSettings.bossRaids[0].levels.find(
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
    const raidSettings = await this.getRaidSettingsFromRedis();
    const bossRaidLimitSeconds = raidSettings.bossRaids[0].bossRaidLimitSeconds;
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
        data: {
          canEnter: true,
        },
      });

      //redis client로 total score 저장 (sorting을 위한 Sorted Set 타입으로 저장)
      const redis = await this.redis.zadd(
        this.REDIS_RANKING_KEY,
        score.totalScore + scoreByLevel.score,
        body.userId.toString()
      );

      return {};
    } else {
      return {
        result: "보스레이드 참여 정보를 찾을 수 없습니다.",
      };
    }
  }

  async getTopRankerList(body: { userId: number }) {
    // 점수가 높은 순서대로 조회 (zrevrange)
    const topRankerList = await this.redis.zrevrange(
      this.REDIS_RANKING_KEY,
      0,
      -1,
      "WITHSCORES"
    );

    let newRankingInfo = [];
    let myRankingInfo = {} as RankingInfo;
    let rank = 0;
    for (let i = 0; i < topRankerList.length; i = i + 2) {
      // 전체 랭킹 저장
      newRankingInfo.push({
        ranking: rank,
        userId: +topRankerList[i],
        totalScore: +topRankerList[i + 1],
      } as RankingInfo);

      // 나의 랭킹 저장
      if (+topRankerList[i] === +body.userId) {
        myRankingInfo = {
          ranking: rank,
          userId: +topRankerList[i],
          totalScore: +topRankerList[i + 1],
        } as RankingInfo;
      }
      rank++;
    }
    const result = {
      topRankerInfoList: newRankingInfo,
      myRankingInfo: myRankingInfo,
    };
    return result;
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
