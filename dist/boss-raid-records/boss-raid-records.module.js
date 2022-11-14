"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BossRaidRecordsModule = void 0;
const common_1 = require("@nestjs/common");
const boss_raid_records_service_1 = require("./boss-raid-records.service");
const boss_raid_records_controller_1 = require("./boss-raid-records.controller");
let BossRaidRecordsModule = class BossRaidRecordsModule {
};
BossRaidRecordsModule = __decorate([
    (0, common_1.Module)({
        controllers: [boss_raid_records_controller_1.BossRaidRecordsController],
        providers: [boss_raid_records_service_1.BossRaidRecordsService]
    })
], BossRaidRecordsModule);
exports.BossRaidRecordsModule = BossRaidRecordsModule;
//# sourceMappingURL=boss-raid-records.module.js.map