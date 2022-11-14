"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalService = exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const boss_raids_module_1 = require("./boss-raids/boss-raids.module");
const boss_raid_records_module_1 = require("./boss-raid-records/boss-raid-records.module");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let AppModule = class AppModule {
    constructor() {
        var xhr = new XMLHttpRequest();
        var target = "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json";
        xhr.open("GET", target);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    GlobalService.bossRaidData = JSON.parse(xhr.responseText);
                    ;
                }
                else {
                    console.log("fail to load");
                }
            }
        };
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true
            }), users_module_1.UsersModule, boss_raids_module_1.BossRaidsModule, boss_raid_records_module_1.BossRaidRecordsModule, prisma_module_1.PrismaModule],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
class GlobalService {
}
exports.GlobalService = GlobalService;
//# sourceMappingURL=app.module.js.map