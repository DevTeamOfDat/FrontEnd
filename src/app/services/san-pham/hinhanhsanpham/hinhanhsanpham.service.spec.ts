import { TestBed } from '@angular/core/testing';

import { HinhanhsanphamService } from './hinhanhsanpham.service';

describe('HinhanhsanphamService', () => {
  let service: HinhanhsanphamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HinhanhsanphamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
