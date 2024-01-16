import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) { }
  create(createSubjectDto: CreateSubjectDto) {
    return this.subjectRepository.save(createSubjectDto);
  }

  findAll() {
    return this.subjectRepository.find({
      where: { active: true }, relations: {
        category: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return this.subjectRepository.update({ id }, { active: false });
  }
}
