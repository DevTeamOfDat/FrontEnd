import { TestBed } from '@angular/core/testing';

import { HoadonService } from './hoadon.service';

describe('HoadonService', () => {
  let service: HoadonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoadonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
