import { Injectable } from '@nestjs/common';
import { CreateStudentOfClassDto } from './dto/create-student-of-class.dto';
import { UpdateStudentOfClassDto } from './dto/update-student-of-class.dto';
import { StudentOfClass } from './entities/student-of-class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Not, Repository } from 'typeorm';

@Injectable()
export class StudentOfClassService {
  constructor(
    @InjectRepository(StudentOfClass)
    private studentOfClassRepository: Repository<StudentOfClass>,
  ) {}
  create(createStudentOfClassDto: CreateStudentOfClassDto) {
    createStudentOfClassDto.signedAt = new Date();
    return this.studentOfClassRepository.save(createStudentOfClassDto);
  }

  findAll(userId: number) {
    return this.studentOfClassRepository.find({
      where: { active: Not(null), userId },
    });
  }

  findAllForPM() {
    return this.studentOfClassRepository.find({ where: { active: false } });
  }

  findOne(id: number) {
    return `This action returns a #${id} studentOfClass`;
  }

  update(id: number, updateStudentOfClassDto: UpdateStudentOfClassDto) {
    return `This action updates a #${id} studentOfClass`;
  }

  remove(userId: number, classId: number) {
    console.log(userId, classId);

    return this.studentOfClassRepository.delete({
      userId: userId,
      classId: classId,
    });
  }

  async getAllStudenClassForPM() {
    const dangKys = await this.studentOfClassRepository.find({
      where: {
        class: { active: true },
        // active: ,
      },

      relations: {
        class: { schedules: { room: true }, subject: true, teacher: true },
        user: true,
      },
    });
    return dangKys;
  }

  async getScheduleForStudent({ start, end, userId }) {
    const dangKys = await this.studentOfClassRepository.find({
      where: {
        class: {
          active: true,
          start: LessThan(new Date(start)),
          end: MoreThan(new Date(end)),
        },
        active: true,
        userId,
      },

      relations: {
        class: { schedules: { room: true }, subject: true, teacher: true },
        user: true,
      },
    });
    return dangKys;
  }

  async approveRequest(data) {
    console.log(data);

    return this.studentOfClassRepository.update(data, { active: true });
  }
  // remove(id: number) {
  //   return `This action removes a #${id} studentOfClass`;
  // }
}
