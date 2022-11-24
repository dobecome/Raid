import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { BossRaidsModule } from "./boss-raids/boss-raids.module";
import { BossRaidRecordsModule } from "./boss-raid-records/boss-raid-records.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "./cache/cache.module";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { RedisConfigService } from "./cache/cache.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    BossRaidsModule,
    BossRaidRecordsModule,
    PrismaModule,
    RedisModule.forRootAsync({
      imports:[ConfigModule],
      useClass: RedisConfigService,
      inject: [ConfigService]
    }),
    CacheModule,
  ],
})

export class AppModule {}
