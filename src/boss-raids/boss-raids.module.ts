import { Module } from '@nestjs/common';
import { BossRaidsService } from './boss-raids.service';
import { BossRaidsController } from './boss-raids.controller';

@Module({
  controllers: [BossRaidsController],
  providers: [BossRaidsService]
})
export class BossRaidsModule {}
