import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto, @Request() req: any) {
    createClassDto.senderId = req['user'].sub
    
    return this.classService.create(createClassDto);
  }

  @Post('/approvedClassByTeacher')
  approvedClassByTeacher(@Body() createClassDto: CreateClassDto, @Request() req: any) {
    createClassDto.senderId = req['user'].sub
    
    return this.classService.approvedClassByTeacher(createClassDto);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }


    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.classService.findOne(+id);
    }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
  //   return this.classService.update(+id, updateClassDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.classService.remove(+id);
  // }
}
