import { BossRaidsService } from './boss-raids.service';
import { CreateBossRaidDto } from './dto/create-boss-raid.dto';
import { UpdateBossRaidDto } from './dto/update-boss-raid.dto';
export declare class BossRaidsController {
    private readonly bossRaidsService;
    constructor(bossRaidsService: BossRaidsService);
    create(createBossRaidDto: CreateBossRaidDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBossRaidDto: UpdateBossRaidDto): string;
    remove(id: string): string;
}
