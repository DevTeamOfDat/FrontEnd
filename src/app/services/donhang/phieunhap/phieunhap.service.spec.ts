import { TestBed } from '@angular/core/testing';

import { PhieunhapService } from './phieunhap.service';

describe('PhieunhapService', () => {
  let service: PhieunhapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieunhapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
