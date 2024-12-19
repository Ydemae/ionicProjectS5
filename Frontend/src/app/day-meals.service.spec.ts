import { TestBed } from '@angular/core/testing';

import { DayMealsService } from './day-meals.service';

describe('DayMealsService', () => {
  let service: DayMealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayMealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
