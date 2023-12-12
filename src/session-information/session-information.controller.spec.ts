import { Test, TestingModule } from '@nestjs/testing';
import { SessionInformationController } from './session-information.controller';
import { SessionInformationService } from './session-information.service';

describe('SessionInformationController', () => {
  let controller: SessionInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionInformationController],
      providers: [SessionInformationService],
    }).compile();

    controller = module.get<SessionInformationController>(SessionInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
