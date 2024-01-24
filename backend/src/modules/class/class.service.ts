import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';
import { cas } from 'src/constants';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class ClassService {

  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,

    private scheduleService: ScheduleService
  ) { }

  async create(createClassDto: CreateClassDto) {
    console.log(createClassDto)

    const cls = await this.classRepository.save({
      name: createClassDto.name,
      subject: [{ id: createClassDto.subjectId }],
      start: createClassDto.dateRange[0],
      end: createClassDto.dateRange[1],
      active: true,
      size: +createClassDto.size,
      teacherId: createClassDto.teacherId
    })

    createClassDto.schedules.forEach(async (data) => {
      console.log("CHECK", {
        active: true,
        start: cas[data.caId].start,
        end: cas[data.caId - 1].end,
        ten: '',
        typeId: 1,
        day: data.day,
        roomId: data.roomId,
        classId: cls.id
      })
      await this.scheduleService.create({
        active: true,
        start: cas[data.caId - 1].start,
        end: cas[data.caId - 1].end,
        ten: '',
        typeId: 1,
        day: data.day,
        roomId: data.roomId,
        classId: cls.id
      } as Schedule)
    })

    return this.findOne(cls.id)
  }

  findAll() {
    return this.classRepository.find({
      where: { active: true },
      relations: {
        subject: true,
        teacher: true,
        schedules: { room: true }
      },
      select: {
        teacher: { fullName: true },
      }
    })
  }

  findOne(id: number) {
    return this.classRepository.findOne({
      where: { active: true , id},
      relations: {
        subject: true,
        teacher: true,
        schedules: { room: true }
      },
      select: {
        teacher: { fullName: true },
      }
    });
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return this.classRepository.update({ id }, updateClassDto)
  }

  remove(id: number) {
    return this.classRepository.update({ id }, { active: false })
  }
}
