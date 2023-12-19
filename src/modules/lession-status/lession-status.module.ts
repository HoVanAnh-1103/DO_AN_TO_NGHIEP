import { Module } from '@nestjs/common';
import { LessionStatusService } from './lession-status.service';
import { LessionStatusController } from './lession-status.controller';

@Module({
  controllers: [LessionStatusController],
  providers: [LessionStatusService],
})
export class LessionStatusModule {}
