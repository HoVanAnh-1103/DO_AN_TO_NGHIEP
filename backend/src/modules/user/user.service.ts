import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
function extractString(inputString: string): string | null {
  const match = inputString.match(/'([^']+)'/);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}
interface MyObject {
  [key: string]: any;
}
function findKeyByValue(obj: MyObject, value: string): string | null {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] == value) {
      return key;
    }
  }
  return null;
}
type InsertError = {
  code: string;
  sqlMessage: string;
} & Error;
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const role = new Role();
    role.id = 3;
    createUserDto.roles = [role];
    createUserDto.password = hashPassword;

    const res = this.userRepository
      .save(createUserDto)
      .catch((error: InsertError) => {
        if (error.code === 'ER_DUP_ENTRY') {
          const duplicateValue = extractString(error.sqlMessage);
          const duplicateKey = findKeyByValue(createUserDto, duplicateValue);
          throw new HttpException(
            {
              message: `${duplicateValue} đã được sử dụng`,
              field: duplicateKey,
            },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(
            {
              message: 'Đã có lỗi xảy ra',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });
    // const resSendMail = this.mailerService.sendMail({
    //   to: createAccountDto.email,
    //   subject: 'demo',
    //   template: './welcome',
    //   context: {
    //     name: createAccountDto.fullName,
    //     password: password,
    //   },
    // });
    return res;
  }


  async createStudent(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash('12345', 10);

    const role = new Role();
    role.id = 3;
    createUserDto.roles = [role];
    createUserDto.password = hashPassword;

    const res = this.userRepository
      .save(createUserDto)
      .catch((error: InsertError) => {
        if (error.code === 'ER_DUP_ENTRY') {
          const duplicateValue = extractString(error.sqlMessage);
          const duplicateKey = findKeyByValue(createUserDto, duplicateValue);
          throw new HttpException(
            {
              message: `${duplicateValue} đã được sử dụng`,
              field: duplicateKey,
            },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(
            {
              message: 'Đã có lỗi xảy ra',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });
   
    return res;
  }
  findAll() {
    return `This action returns all user`;
  }



  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.update({id}, {active: false});
  }
  async findOneByEmail(email: string) {
    const account = await this.userRepository.find({
      where: { email: email },
      relations: {
        roles: true,
        // avatar: true,
      },
      select: {
        roles: {
          name: true,
        },
      },
    });
    if (account.length > 0) return account[0];
  }


  async findAllStudent() {
    return this.userRepository.find({
      where: {
        active: true,
        roles: { id: 3 }
      }
    })
  }
}
