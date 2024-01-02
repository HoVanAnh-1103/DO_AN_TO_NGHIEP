import { Test, TestingModule } from '@nestjs/testing';
import { StudentOfClassService } from './student-of-class.service';

describe('StudentOfClassService', () => {
  let service: StudentOfClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentOfClassService],
    }).compile();

    service = module.get<StudentOfClassService>(StudentOfClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
