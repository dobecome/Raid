import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BossRaidRecordsService } from './boss-raid-records.service';
import { CreateBossRaidRecordDto } from './dto/create-boss-raid-record.dto';
import { UpdateBossRaidRecordDto } from './dto/update-boss-raid-record.dto';

@Controller('boss-raid-records')
export class BossRaidRecordsController {
  constructor(private readonly bossRaidRecordsService: BossRaidRecordsService) {}

  @Post()
  create(@Body() createBossRaidRecordDto: CreateBossRaidRecordDto) {
    return this.bossRaidRecordsService.create(createBossRaidRecordDto);
  }

  @Get()
  findAll() {
    return this.bossRaidRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bossRaidRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBossRaidRecordDto: UpdateBossRaidRecordDto) {
    return this.bossRaidRecordsService.update(+id, updateBossRaidRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bossRaidRecordsService.remove(+id);
  }
}
