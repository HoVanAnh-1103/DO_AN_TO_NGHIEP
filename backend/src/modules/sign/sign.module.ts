import { Module } from '@nestjs/common';
import { SignService } from './sign.service';
import { SignController } from './sign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sign } from './entities/sign.entity';
import { Class } from '../class/entities/class.entity';
import { ClassModule } from '../class/class.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sign]), ClassModule, TypeOrmModule.forFeature([Class])],
  controllers: [SignController],
  providers: [SignService],

})
export class SignModule { }
