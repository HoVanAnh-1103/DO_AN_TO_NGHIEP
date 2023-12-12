import { Injectable } from '@nestjs/common';
import { CreateLessionStatusDto } from './dto/create-lession-status.dto';
import { UpdateLessionStatusDto } from './dto/update-lession-status.dto';

@Injectable()
export class LessionStatusService {
  create(createLessionStatusDto: CreateLessionStatusDto) {
    return 'This action adds a new lessionStatus';
  }

  findAll() {
    return `This action returns all lessionStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessionStatus`;
  }

  update(id: number, updateLessionStatusDto: UpdateLessionStatusDto) {
    return `This action updates a #${id} lessionStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessionStatus`;
  }
}
