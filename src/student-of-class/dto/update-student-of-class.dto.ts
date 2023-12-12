import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentOfClassDto } from './create-student-of-class.dto';

export class UpdateStudentOfClassDto extends PartialType(CreateStudentOfClassDto) {}
