import { PartialType } from '@nestjs/mapped-types';
import { CreateBossRaidRecordDto } from './create-boss-raid-record.dto';

export class UpdateBossRaidRecordDto extends PartialType(CreateBossRaidRecordDto) {}
