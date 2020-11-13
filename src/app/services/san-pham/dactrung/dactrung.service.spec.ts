import { TestBed } from '@angular/core/testing';

import { DactrungService } from './dactrung.service';

describe('DactrungService', () => {
  let service: DactrungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DactrungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
