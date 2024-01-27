import { Injectable } from '@nestjs/common';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receiver } from './entities/receiver.entity';

@Injectable()
export class ReceiverService {
  constructor(
    @InjectRepository(Receiver)
    private receiverRepository: Repository<Receiver>
  ) { }
  create(createReceiverDto: CreateReceiverDto) {
    return this.receiverRepository.save(createReceiverDto);
  }

  findAll() {
    return `This action returns all receiver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receiver`;
  }

  update(id: number, updateReceiverDto: UpdateReceiverDto) {
    return `This action updates a #${id} receiver`;
  }

  remove(id: number) {
    return `This action removes a #${id} receiver`;
  }
}
