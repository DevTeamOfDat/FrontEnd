import { TestBed } from '@angular/core/testing';

import { KhuyenmaisanphamService } from './khuyenmaisanpham.service';

describe('KhuyenmaisanphamService', () => {
  let service: KhuyenmaisanphamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhuyenmaisanphamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
