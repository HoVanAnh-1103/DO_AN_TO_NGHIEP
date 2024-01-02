import { Test, TestingModule } from '@nestjs/testing';
import { StudentOfClassController } from './student-of-class.controller';
import { StudentOfClassService } from './student-of-class.service';

describe('StudentOfClassController', () => {
  let controller: StudentOfClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentOfClassController],
      providers: [StudentOfClassService],
    }).compile();

    controller = module.get<StudentOfClassController>(StudentOfClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
