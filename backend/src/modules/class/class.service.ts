import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {

  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,) { }

  create(createClassDto: CreateClassDto) {
    return this.classRepository.find(createClassDto)
  }

  findAll() {
    return this.classRepository.find({
      where: { active: true },
      relations: {
        subject: true,
        teacher: true,
        schedules: { room: true }
      },
      select: {
        teacher: { fullName: true },
      }
    })
  }

  findOne(id: number) {
    return this.classRepository.findOne({ where: { id } });
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return this.classRepository.update({ id }, updateClassDto)
  }

  remove(id: number) {
    return this.classRepository.update({ id }, { active: false })
  }
}
