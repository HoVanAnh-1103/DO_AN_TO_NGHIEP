import { Injectable } from '@nestjs/common';
import { CreateTypeScheduleDto } from './dto/create-type-schedule.dto';
import { UpdateTypeScheduleDto } from './dto/update-type-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeSchedule } from './entities/type-schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeScheduleService {
  constructor(
    @InjectRepository(TypeSchedule)
    private typeScheduleRepository: Repository<TypeSchedule>,) { }
    
  create(createTypeScheduleDto: CreateTypeScheduleDto) {
    return this.typeScheduleRepository.create(createTypeScheduleDto)
  }

  findAll() {
    return this.typeScheduleRepository.find({ where: { active: true } });
  }

  findOne(id: number) {
    return this.typeScheduleRepository.findOne({ where: { id } })
  }

  update(id: number, updateTypeScheduleDto: UpdateTypeScheduleDto) {
    return this.typeScheduleRepository.update({ id }, updateTypeScheduleDto)
  }

  remove(id: number) {
    return this.typeScheduleRepository.update({ id }, { active: false })
  }
}
