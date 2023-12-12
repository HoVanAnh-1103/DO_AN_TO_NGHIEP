import { Injectable } from '@nestjs/common';
import { CreateTypeScheduleDto } from './dto/create-type-schedule.dto';
import { UpdateTypeScheduleDto } from './dto/update-type-schedule.dto';

@Injectable()
export class TypeScheduleService {
  create(createTypeScheduleDto: CreateTypeScheduleDto) {
    return 'This action adds a new typeSchedule';
  }

  findAll() {
    return `This action returns all typeSchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeSchedule`;
  }

  update(id: number, updateTypeScheduleDto: UpdateTypeScheduleDto) {
    return `This action updates a #${id} typeSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeSchedule`;
  }
}
