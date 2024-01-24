import { Module } from '@nestjs/common';
import { StudentOfClassService } from './student-of-class.service';
import { StudentOfClassController } from './student-of-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentOfClass } from './entities/student-of-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentOfClass])],
  controllers: [StudentOfClassController],
  providers: [StudentOfClassService],
})
export class StudentOfClassModule {}
