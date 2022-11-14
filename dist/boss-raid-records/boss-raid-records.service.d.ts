import { CreateBossRaidRecordDto } from './dto/create-boss-raid-record.dto';
import { UpdateBossRaidRecordDto } from './dto/update-boss-raid-record.dto';
export declare class BossRaidRecordsService {
    create(createBossRaidRecordDto: CreateBossRaidRecordDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBossRaidRecordDto: UpdateBossRaidRecordDto): string;
    remove(id: number): string;
}
