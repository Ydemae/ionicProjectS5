import { TestBed } from '@angular/core/testing';

import { RegisteredDayService } from './registered-day.service';

describe('RegisteredDayService', () => {
  let service: RegisteredDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisteredDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
