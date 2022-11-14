import { Module } from '@nestjs/common';
import { BossRaidRecordsService } from './boss-raid-records.service';
import { BossRaidRecordsController } from './boss-raid-records.controller';

@Module({
  controllers: [BossRaidRecordsController],
  providers: [BossRaidRecordsService]
})
export class BossRaidRecordsModule {}
