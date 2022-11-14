import { CreateBossRaidDto } from './dto/create-boss-raid.dto';
import { UpdateBossRaidDto } from './dto/update-boss-raid.dto';
export declare class BossRaidsService {
    create(createBossRaidDto: CreateBossRaidDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBossRaidDto: UpdateBossRaidDto): string;
    remove(id: number): string;
}
