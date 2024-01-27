import { Module } from '@nestjs/common';
import { ReceiverService } from './receiver.service';
import { ReceiverController } from './receiver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receiver } from './entities/receiver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receiver])],

  controllers: [ReceiverController],
  providers: [ReceiverService],
  exports: [ReceiverService]
})
export class ReceiverModule {}
