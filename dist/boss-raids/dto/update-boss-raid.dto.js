"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBossRaidDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_boss_raid_dto_1 = require("./create-boss-raid.dto");
class UpdateBossRaidDto extends (0, mapped_types_1.PartialType)(create_boss_raid_dto_1.CreateBossRaidDto) {
}
exports.UpdateBossRaidDto = UpdateBossRaidDto;
//# sourceMappingURL=update-boss-raid.dto.js.map