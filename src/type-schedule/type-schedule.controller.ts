import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeScheduleService } from './type-schedule.service';
import { CreateTypeScheduleDto } from './dto/create-type-schedule.dto';
import { UpdateTypeScheduleDto } from './dto/update-type-schedule.dto';

@Controller('type-schedule')
export class TypeScheduleController {
  constructor(private readonly typeScheduleService: TypeScheduleService) {}

  @Post()
  create(@Body() createTypeScheduleDto: CreateTypeScheduleDto) {
    return this.typeScheduleService.create(createTypeScheduleDto);
  }

  @Get()
  findAll() {
    return this.typeScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeScheduleDto: UpdateTypeScheduleDto) {
    return this.typeScheduleService.update(+id, updateTypeScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeScheduleService.remove(+id);
  }
}
