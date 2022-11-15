import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
} from "@nestjs/common";
import { BossRaidsService } from "./boss-raids.service";

@Controller("api/bossRaid")
export class BossRaidsController {
  constructor(private readonly bossRaidsService: BossRaidsService) {}

  @Post()
  initBossRaid() {
    return this.bossRaidsService.initBossRaid();
  }

  @Get()
  getBossRaidStatus() {
    return this.bossRaidsService.getBossRaidStatus();
  }

  @Post("enter")
  postBeginBossRaid(@Body() body: { userId: number; level: number }) {
    return this.bossRaidsService.postBeginBossRaid(body);
  }

  @Patch("end")
  patchEndBossRaid(@Body() body: { userId: number; raidRecordId: number }) {
    return this.bossRaidsService.patchEndBossRaid(body);
  }

  @Get("topRankerList")
  getTopRankerList(@Body() body: { userId: number;}) {
    return this.bossRaidsService.getTopRankerList(body);
  }
}
