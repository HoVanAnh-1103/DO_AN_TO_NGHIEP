import { Test, TestingModule } from '@nestjs/testing';
import { TypeScheduleController } from './type-schedule.controller';
import { TypeScheduleService } from './type-schedule.service';

describe('TypeScheduleController', () => {
  let controller: TypeScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeScheduleController],
      providers: [TypeScheduleService],
    }).compile();

    controller = module.get<TypeScheduleController>(TypeScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
