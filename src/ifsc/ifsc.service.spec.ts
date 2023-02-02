import { Test, TestingModule } from '@nestjs/testing';
import { IfscService } from './ifsc.service';

describe('IfscService', () => {
  let service: IfscService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IfscService],
    }).compile();

    service = module.get<IfscService>(IfscService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
