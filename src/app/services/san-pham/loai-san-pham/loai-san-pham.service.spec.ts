import { TestBed } from '@angular/core/testing';

import { LoaiSanPhamService } from './loai-san-pham.service';

describe('LoaiSanPhamService', () => {
  let service: LoaiSanPhamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaiSanPhamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
