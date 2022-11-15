import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { BossRaidsModule } from "./boss-raids/boss-raids.module";
import { BossRaidRecordsModule } from "./boss-raid-records/boss-raid-records.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "./cache/cache.module";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { RedisConfigService } from "./cache/cache.config";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
export class AppModule {
  constructor() {
    var xhr = new XMLHttpRequest();
    var target =
      "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json";
    xhr.open("GET", target);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status == 200) {
          GlobalService.bossRaidData = JSON.parse(xhr.responseText);
        } else {
          console.log("fail to load S3 Data");
        }
      }
    };
  }
}
export class GlobalService {
  static bossRaidData: JSON;
}
