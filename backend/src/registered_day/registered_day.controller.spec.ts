import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredDayController } from './registered_day.controller';

describe('RegisteredDayController', () => {
  let controller: RegisteredDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisteredDayController],
    }).compile();

    controller = module.get<RegisteredDayController>(RegisteredDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
