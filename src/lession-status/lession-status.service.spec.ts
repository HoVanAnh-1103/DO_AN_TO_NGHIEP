import { Test, TestingModule } from '@nestjs/testing';
import { LessionStatusService } from './lession-status.service';

describe('LessionStatusService', () => {
  let service: LessionStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessionStatusService],
    }).compile();

    service = module.get<LessionStatusService>(LessionStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
