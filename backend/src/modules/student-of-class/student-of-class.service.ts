import { Injectable } from '@nestjs/common';
import { CreateStudentOfClassDto } from './dto/create-student-of-class.dto';
import { UpdateStudentOfClassDto } from './dto/update-student-of-class.dto';

@Injectable()
export class StudentOfClassService {
  create(createStudentOfClassDto: CreateStudentOfClassDto) {
    return 'This action adds a new studentOfClass';
  }

  findAll() {
    return `This action returns all studentOfClass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentOfClass`;
  }

  update(id: number, updateStudentOfClassDto: UpdateStudentOfClassDto) {
    return `This action updates a #${id} studentOfClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentOfClass`;
  }
}
