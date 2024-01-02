import { Test, TestingModule } from '@nestjs/testing';
import { SessionInformationService } from './session-information.service';

describe('SessionInformationService', () => {
  let service: SessionInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionInformationService],
    }).compile();

    service = module.get<SessionInformationService>(SessionInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
