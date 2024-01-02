import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessionStatusService } from './lession-status.service';
import { CreateLessionStatusDto } from './dto/create-lession-status.dto';
import { UpdateLessionStatusDto } from './dto/update-lession-status.dto';

@Controller('lession-status')
export class LessionStatusController {
  constructor(private readonly lessionStatusService: LessionStatusService) {}

  @Post()
  create(@Body() createLessionStatusDto: CreateLessionStatusDto) {
    return this.lessionStatusService.create(createLessionStatusDto);
  }

  @Get()
  findAll() {
    return this.lessionStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessionStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessionStatusDto: UpdateLessionStatusDto) {
    return this.lessionStatusService.update(+id, updateLessionStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessionStatusService.remove(+id);
  }
}
