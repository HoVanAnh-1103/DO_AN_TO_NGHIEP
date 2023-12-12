import { Module } from '@nestjs/common';
import { SessionInformationService } from './session-information.service';
import { SessionInformationController } from './session-information.controller';

@Module({
  controllers: [SessionInformationController],
  providers: [SessionInformationService],
})
export class SessionInformationModule {}
