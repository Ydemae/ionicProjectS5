import { Test, TestingModule } from '@nestjs/testing';
import { DayMealsService } from './day_meals.service';

describe('DayMealsService', () => {
  let service: DayMealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayMealsService],
    }).compile();

    service = module.get<DayMealsService>(DayMealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
