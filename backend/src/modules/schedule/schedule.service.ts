import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,) { }
  create(createScheduleDto: CreateScheduleDto) {
    return this.scheduleRepository.save(createScheduleDto);
  }

  findAll() {
    return this.scheduleRepository.find({ where: { active: true } })
  }

  findOne(id: number) {
    return this.scheduleRepository.findOne({ where: { id } })
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleRepository.update({ id }, updateScheduleDto);
  }

  remove(id: number) {
    return this.scheduleRepository.update({ id }, {active: false});
  }
}
