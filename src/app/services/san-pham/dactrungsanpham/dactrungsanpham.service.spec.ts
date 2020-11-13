import { TestBed } from '@angular/core/testing';

import { DactrungsanphamService } from './dactrungsanpham.service';

describe('DactrungsanphamService', () => {
  let service: DactrungsanphamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DactrungsanphamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
