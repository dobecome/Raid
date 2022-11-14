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
exports.BossRaidsController = void 0;
const common_1 = require("@nestjs/common");
const boss_raids_service_1 = require("./boss-raids.service");
const create_boss_raid_dto_1 = require("./dto/create-boss-raid.dto");
const update_boss_raid_dto_1 = require("./dto/update-boss-raid.dto");
let BossRaidsController = class BossRaidsController {
    constructor(bossRaidsService) {
        this.bossRaidsService = bossRaidsService;
    }
    create(createBossRaidDto) {
        return this.bossRaidsService.create(createBossRaidDto);
    }
    findAll() {
        return this.bossRaidsService.findAll();
    }
    findOne(id) {
        return this.bossRaidsService.findOne(+id);
    }
    update(id, updateBossRaidDto) {
        return this.bossRaidsService.update(+id, updateBossRaidDto);
    }
    remove(id) {
        return this.bossRaidsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_boss_raid_dto_1.CreateBossRaidDto]),
    __metadata("design:returntype", void 0)
], BossRaidsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BossRaidsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BossRaidsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_boss_raid_dto_1.UpdateBossRaidDto]),
    __metadata("design:returntype", void 0)
], BossRaidsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BossRaidsController.prototype, "remove", null);
BossRaidsController = __decorate([
    (0, common_1.Controller)('boss-raids'),
    __metadata("design:paramtypes", [boss_raids_service_1.BossRaidsService])
], BossRaidsController);
exports.BossRaidsController = BossRaidsController;
//# sourceMappingURL=boss-raids.controller.js.map