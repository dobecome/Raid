import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BossRaidsService } from './boss-raids.service';
import { CreateBossRaidDto } from './dto/create-boss-raid.dto';
import { UpdateBossRaidDto } from './dto/update-boss-raid.dto';

@Controller('boss-raids')
export class BossRaidsController {
  constructor(private readonly bossRaidsService: BossRaidsService) {}

  @Post()
  create(@Body() createBossRaidDto: CreateBossRaidDto) {
    return this.bossRaidsService.create(createBossRaidDto);
  }

  @Get()
  findAll() {
    return this.bossRaidsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bossRaidsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBossRaidDto: UpdateBossRaidDto) {
    return this.bossRaidsService.update(+id, updateBossRaidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bossRaidsService.remove(+id);
  }
}
