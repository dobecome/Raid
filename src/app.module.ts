import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BossRaidsModule } from './boss-raids/boss-raids.module';

@Module({
  imports: [UsersModule, BossRaidsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
