import { Injectable } from '@nestjs/common';
import { CreateSessionInformationDto } from './dto/create-session-information.dto';
import { UpdateSessionInformationDto } from './dto/update-session-information.dto';

@Injectable()
export class SessionInformationService {
  create(createSessionInformationDto: CreateSessionInformationDto) {
    return 'This action adds a new sessionInformation';
  }

  findAll() {
    return `This action returns all sessionInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sessionInformation`;
  }

  update(id: number, updateSessionInformationDto: UpdateSessionInformationDto) {
    return `This action updates a #${id} sessionInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} sessionInformation`;
  }
}
