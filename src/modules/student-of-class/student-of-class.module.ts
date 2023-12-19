import { Module } from '@nestjs/common';
import { StudentOfClassService } from './student-of-class.service';
import { StudentOfClassController } from './student-of-class.controller';

@Module({
  controllers: [StudentOfClassController],
  providers: [StudentOfClassService],
})
export class StudentOfClassModule {}
