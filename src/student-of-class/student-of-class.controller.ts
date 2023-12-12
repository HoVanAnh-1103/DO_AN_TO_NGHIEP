import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentOfClassService } from './student-of-class.service';
import { CreateStudentOfClassDto } from './dto/create-student-of-class.dto';
import { UpdateStudentOfClassDto } from './dto/update-student-of-class.dto';

@Controller('student-of-class')
export class StudentOfClassController {
  constructor(private readonly studentOfClassService: StudentOfClassService) {}

  @Post()
  create(@Body() createStudentOfClassDto: CreateStudentOfClassDto) {
    return this.studentOfClassService.create(createStudentOfClassDto);
  }

  @Get()
  findAll() {
    return this.studentOfClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentOfClassService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentOfClassDto: UpdateStudentOfClassDto) {
    return this.studentOfClassService.update(+id, updateStudentOfClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentOfClassService.remove(+id);
  }
}
