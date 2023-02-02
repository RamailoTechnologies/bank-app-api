import { Test, TestingModule } from '@nestjs/testing';
import { IfscController } from './ifsc.controller';
import { IfscService } from './ifsc.service';

describe('IfscController', () => {
  let controller: IfscController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IfscController],
      providers: [IfscService],
    }).compile();

    controller = module.get<IfscController>(IfscController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
