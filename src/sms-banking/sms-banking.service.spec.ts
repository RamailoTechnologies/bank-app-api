import { Test, TestingModule } from '@nestjs/testing';
import { SmsBankingService } from './sms-banking.service';

describe('SmsBankingService', () => {
  let service: SmsBankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsBankingService],
    }).compile();

    service = module.get<SmsBankingService>(SmsBankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
