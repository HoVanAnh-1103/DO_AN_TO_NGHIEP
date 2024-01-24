import { Injectable } from '@nestjs/common';
import { CreateSignDto } from './dto/create-sign.dto';
import { UpdateSignDto } from './dto/update-sign.dto';
import { Sign } from './entities/sign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, IsNull, Not, Repository } from 'typeorm';
import { Class } from '../class/entities/class.entity';
import { SignUpClassStatus } from '../auth/guards/role.enum';

@Injectable()
export class SignService {
  constructor(
    @InjectRepository(Sign)
    private signRepository: Repository<Sign>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(createSignDto: CreateSignDto) {
    const s = await this.signRepository.create({
      ...createSignDto,
      signedAt: new Date(),
      active: true,
      status: SignUpClassStatus.PENDDING,

    });
    return this.signRepository.save(s);
  }

  findAll(userId) {
    return this.classRepository.find({
      where: { active: true, teacherId: userId },
      relations: {
        subject: true,
        teacher: true,
        schedules: { room: true },
      },
      select: {
        teacher: { fullName: true },
      },
    });
  }

  async findAllClassNotAsignet(userId: number) {
    const daDAngKys = await this.classRepository.find({
      where: {
        active: true,
        teacherId: IsNull(),
        signs: {
          teacherId: userId,
        },
      },
      relations: {
        subject: true,
        schedules: { room: true },
        signs: true,
      },
    });

    const chuaDangKy = await await this.classRepository.find({
      where: {
        active: true,
        teacherId: IsNull(),
        id: Not(In(daDAngKys.map((d) => d.id))),
      },
      relations: {
        subject: true,
        schedules: { room: true },
      },
    });
    return [...daDAngKys, ...chuaDangKy];
  }

  async findAllClassForStudent(userId: number) {
    
    const daDAngKys = await this.classRepository.find({
      where: {
        active: true,
        teacherId: Not(IsNull()),
        studentOfClasses: {
          userId: userId,
          active: Not(true)
        },
      },
      relations: {
        subject: true,
        schedules: { room: true },
        studentOfClasses: true,
        teacher: true
      },
    });

    const chuaDangKy = await await this.classRepository.find({
      where: {
        active: true,
        teacherId: Not(IsNull()),
        id: Not(In(daDAngKys.map((d) => d.id))),
      },
      relations: {
        subject: true,
        schedules: { room: true },
        teacher: true
      },
    });
    return [...daDAngKys, ...chuaDangKy];
  }

  async getAllSignUpForPM() {
    const dangKys = await this.signRepository.find({
      where: {
        class: { active: true },
        active: true,
      },

      relations: {
        class: { schedules: { room: true }, subject: true },
        teacher: { user: true },
      },
    });
    return dangKys;
  }


  findOne(id: number) {
    return `This action returns a #${id} sign`;
  }

  async update(id: number, UpdateSignDto: UpdateSignDto) {
    console.log(UpdateSignDto);

    const { teacherId, classId, ...data } = UpdateSignDto;
    if (data.status == SignUpClassStatus.APPROVED)
      await this.classRepository.update({ id: +classId }, {  teacherId });
    return this.signRepository.update({ teacherId, classId }, data);
  }

  remove(userId: number, classId: number) {
    return this.signRepository.delete({ teacherId: userId, classId: classId });
  }
}
