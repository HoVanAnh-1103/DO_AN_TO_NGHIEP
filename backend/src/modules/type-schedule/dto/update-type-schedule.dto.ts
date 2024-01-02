import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeScheduleDto } from './create-type-schedule.dto';

export class UpdateTypeScheduleDto extends PartialType(CreateTypeScheduleDto) {}
