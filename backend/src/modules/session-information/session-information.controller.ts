import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionInformationService } from './session-information.service';
import { CreateSessionInformationDto } from './dto/create-session-information.dto';
import { UpdateSessionInformationDto } from './dto/update-session-information.dto';

@Controller('session-information')
export class SessionInformationController {
  constructor(private readonly sessionInformationService: SessionInformationService) {}

  @Post()
  create(@Body() createSessionInformationDto: CreateSessionInformationDto) {
    return this.sessionInformationService.create(createSessionInformationDto);
  }

  @Get()
  findAll() {
    return this.sessionInformationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionInformationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionInformationDto: UpdateSessionInformationDto) {
    return this.sessionInformationService.update(+id, updateSessionInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionInformationService.remove(+id);
  }
}
