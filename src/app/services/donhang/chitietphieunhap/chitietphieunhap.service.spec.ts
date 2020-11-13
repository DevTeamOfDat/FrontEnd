import { TestBed } from '@angular/core/testing';

import { ChitietphieunhapService } from './chitietphieunhap.service';

describe('ChitietphieunhapService', () => {
  let service: ChitietphieunhapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChitietphieunhapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
