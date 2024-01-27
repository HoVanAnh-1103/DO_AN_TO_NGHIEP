import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { Subject } from '../subject/entities/subject.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private techerRepository: Repository<Teacher>,
  ) {}
  create(createTeacherDto: CreateTeacherDto) {
    const {subjects} = createTeacherDto
    const subject = []
    subjects.forEach(element => {
      const sub =  new Subject()
      sub.id = element
      subject.push(sub)
    }); 
    createTeacherDto.subject = subject


    return this.techerRepository.save(createTeacherDto);
  }

  findAll() {
    return this.techerRepository.find({
      relations: {
        user: true,
        subject: true
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const {subjects} = updateTeacherDto
    const subject = []
    subjects.forEach(element => {
      const sub =  new Subject()
      sub.id = element
      subject.push(sub)
    }); 
    updateTeacherDto.subject = subject

    updateTeacherDto.userId = updateTeacherDto.id
    return this.techerRepository.save(updateTeacherDto);
  }

  remove(id: number) {
    return this.techerRepository.update({ userId: id }, { active: false });
  }
}
