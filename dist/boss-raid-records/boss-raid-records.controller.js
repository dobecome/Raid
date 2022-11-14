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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BossRaidRecordsController = void 0;
const common_1 = require("@nestjs/common");
const boss_raid_records_service_1 = require("./boss-raid-records.service");
const create_boss_raid_record_dto_1 = require("./dto/create-boss-raid-record.dto");
const update_boss_raid_record_dto_1 = require("./dto/update-boss-raid-record.dto");
let BossRaidRecordsController = class BossRaidRecordsController {
    constructor(bossRaidRecordsService) {
        this.bossRaidRecordsService = bossRaidRecordsService;
    }
    create(createBossRaidRecordDto) {
        return this.bossRaidRecordsService.create(createBossRaidRecordDto);
    }
    findAll() {
        return this.bossRaidRecordsService.findAll();
    }
    findOne(id) {
        return this.bossRaidRecordsService.findOne(+id);
    }
    update(id, updateBossRaidRecordDto) {
        return this.bossRaidRecordsService.update(+id, updateBossRaidRecordDto);
    }
    remove(id) {
        return this.bossRaidRecordsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_boss_raid_record_dto_1.CreateBossRaidRecordDto]),
    __metadata("design:returntype", void 0)
], BossRaidRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BossRaidRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BossRaidRecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_boss_raid_record_dto_1.UpdateBossRaidRecordDto]),
    __metadata("design:returntype", void 0)
], BossRaidRecordsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BossRaidRecordsController.prototype, "remove", null);
BossRaidRecordsController = __decorate([
    (0, common_1.Controller)('boss-raid-records'),
    __metadata("design:paramtypes", [boss_raid_records_service_1.BossRaidRecordsService])
], BossRaidRecordsController);
exports.BossRaidRecordsController = BossRaidRecordsController;
//# sourceMappingURL=boss-raid-records.controller.js.map