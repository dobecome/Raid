import { BossRaidRecordsService } from './boss-raid-records.service';
import { CreateBossRaidRecordDto } from './dto/create-boss-raid-record.dto';
import { UpdateBossRaidRecordDto } from './dto/update-boss-raid-record.dto';
export declare class BossRaidRecordsController {
    private readonly bossRaidRecordsService;
    constructor(bossRaidRecordsService: BossRaidRecordsService);
    create(createBossRaidRecordDto: CreateBossRaidRecordDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBossRaidRecordDto: UpdateBossRaidRecordDto): string;
    remove(id: string): string;
}
