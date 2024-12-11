import { Test, TestingModule } from '@nestjs/testing';
import { DayMealsController } from './day_meals.controller';

describe('DayMealsController', () => {
  let controller: DayMealsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayMealsController],
    }).compile();

    controller = module.get<DayMealsController>(DayMealsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
