import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredDayService } from './registered_day.service';

describe('RegisteredDayService', () => {
  let service: RegisteredDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisteredDayService],
    }).compile();

    service = module.get<RegisteredDayService>(RegisteredDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
