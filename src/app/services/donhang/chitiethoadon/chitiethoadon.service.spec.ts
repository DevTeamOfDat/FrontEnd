import { TestBed } from '@angular/core/testing';

import { ChitiethoadonService } from './chitiethoadon.service';

describe('ChitiethoadonService', () => {
  let service: ChitiethoadonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChitiethoadonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
