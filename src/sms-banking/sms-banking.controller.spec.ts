import { Test, TestingModule } from '@nestjs/testing';
import { SmsBankingController } from './sms-banking.controller';
import { SmsBankingService } from './sms-banking.service';

describe('SmsBankingController', () => {
  let controller: SmsBankingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsBankingController],
      providers: [SmsBankingService],
    }).compile();

    controller = module.get<SmsBankingController>(SmsBankingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
