import { TestBed } from '@angular/core/testing';

import { LoaitaikhoanService } from './loaitaikhoan.service';

describe('LoaitaikhoanService', () => {
  let service: LoaitaikhoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaitaikhoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
