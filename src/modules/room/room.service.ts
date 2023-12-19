import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomPrository: Repository<Room>
  ) { }
  create(createRoomDto: CreateRoomDto) {
    return this.roomPrository.create(createRoomDto)
  }

  findAll() {
    return this.roomPrository.find({ where: { active: true } })
  }

  findOne(id: number) {
    return this.roomPrository.findOne({ where: { id } })
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomPrository.update({ id }, updateRoomDto)
  }

  remove(id: number) {
    return this.roomPrository.update({ id }, { active: false })
  }
}
