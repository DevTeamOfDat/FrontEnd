import { TestBed } from '@angular/core/testing';

import { LoaidonService } from './loaidon.service';

describe('LoaidonService', () => {
  let service: LoaidonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaidonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
