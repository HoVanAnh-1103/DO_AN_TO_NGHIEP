import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { SignService } from './sign.service';
import { CreateSignDto } from './dto/create-sign.dto';
import { UpdateSignDto } from './dto/update-sign.dto';
import { Request as RE } from 'express';

@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) { }

  @Post()
  create(@Body() createSignDto: CreateSignDto, @Request() req) {
    console.log(req['user']);
    console.log('CHECK');

    createSignDto.teacherId = req['user'].sub
    return this.signService.create(createSignDto);
  }

  @Get()
  findAll(@Request() req: RE) {
    console.log('CHECK');

    return this.signService.findAll(req['user'].sub);
  }

  @Get('all-class-not-asignet')
  findAllClassNotAsignet(@Request() req: RE) {
    console.log('all-class-not-asignet');

    return this.signService.findAllClassNotAsignet(req['user'].sub);
  }

  @Get('all-class-for-pm')
  findAllSingUpForPM(@Request() req: RE) {
    console.log('all-class-for-pm');
    return this.signService.getAllSignUpForPM();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignDto: UpdateSignDto) {
    return this.signService.update(+id, updateSignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RE) {
    return this.signService.remove(req['user'].sub, +id);
  }

}
