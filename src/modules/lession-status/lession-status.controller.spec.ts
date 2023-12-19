import { Test, TestingModule } from '@nestjs/testing';
import { LessionStatusController } from './lession-status.controller';
import { LessionStatusService } from './lession-status.service';

describe('LessionStatusController', () => {
  let controller: LessionStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessionStatusController],
      providers: [LessionStatusService],
    }).compile();

    controller = module.get<LessionStatusController>(LessionStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
