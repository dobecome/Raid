import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BossRaidsService } from "./boss-raids.service";
import { CreateBossRaidDto } from "./dto/create-boss-raid.dto";
import { UpdateBossRaidDto } from "./dto/update-boss-raid.dto";

@Controller("api/bossRaids")
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bossRaidsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBossRaidDto: UpdateBossRaidDto) {
  //   return this.bossRaidsService.update(+id, updateBossRaidDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bossRaidsService.remove(+id);
  // }
}
