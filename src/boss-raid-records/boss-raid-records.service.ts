import { Injectable } from '@nestjs/common';
import { CreateBossRaidRecordDto } from './dto/create-boss-raid-record.dto';
import { UpdateBossRaidRecordDto } from './dto/update-boss-raid-record.dto';

@Injectable()
export class BossRaidRecordsService {
  create(createBossRaidRecordDto: CreateBossRaidRecordDto) {
    return 'This action adds a new bossRaidRecord';
  }

  findAll() {
    return `This action returns all bossRaidRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bossRaidRecord`;
  }

  update(id: number, updateBossRaidRecordDto: UpdateBossRaidRecordDto) {
    return `This action updates a #${id} bossRaidRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} bossRaidRecord`;
  }
}
