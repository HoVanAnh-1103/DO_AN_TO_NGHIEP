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

  update(where : any, updateReceiverDto: UpdateReceiverDto) {
    return this.receiverRepository.update(where, updateReceiverDto);
  }

  remove(id: number) {
    return `This action removes a #${id} receiver`;
  }
}
