import { TestBed } from '@angular/core/testing';

import { NgayKhuyenMaiService } from './ngay-khuyen-mai.service';

describe('NgayKhuyenMaiService', () => {
  let service: NgayKhuyenMaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgayKhuyenMaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
