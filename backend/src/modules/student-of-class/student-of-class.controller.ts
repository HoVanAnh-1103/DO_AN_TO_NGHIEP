import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { StudentOfClassService } from './student-of-class.service';
import { CreateStudentOfClassDto } from './dto/create-student-of-class.dto';
import { UpdateStudentOfClassDto } from './dto/update-student-of-class.dto';
import { Request as RQ } from 'express';

@Controller('student-of-class')
export class StudentOfClassController {
  constructor(private readonly studentOfClassService: StudentOfClassService) {}

  @Post()
  create(
    @Body() createStudentOfClassDto: CreateStudentOfClassDto,
    @Request() req: RQ,
  ) {
    createStudentOfClassDto.userId = req['user'].sub;
    return this.studentOfClassService.create(createStudentOfClassDto);
  }

  @Get()
  findAll() {
    // return this.studentOfClassService.findAll();
  }

  @Get('/getAllStudenClassForPM')
  getAllStudenClassForPM() {
    return this.studentOfClassService.getAllStudenClassForPM();
  }
  @Get('/mySchedule')
  mySchedule(@Query() params, @Request() req: RQ) {
    params.userId = req['user'].sub;
    return this.studentOfClassService.getScheduleForStudent(params);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.studentOfClassService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStudentOfClassDto: UpdateStudentOfClassDto) {
  //   return this.studentOfClassService.update(+id, updateStudentOfClassDto);
  // }

  @Patch('/approveRequest')
  approveRequest(@Body() updateStudentOfClassDto: UpdateStudentOfClassDto) {
    return this.studentOfClassService.approveRequest(updateStudentOfClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: Request) {
    return this.studentOfClassService.remove(req['user'].sub, +id);
  }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.studentOfClassService.remove(+id);
  // }
}
