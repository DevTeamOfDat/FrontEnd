import { TestBed } from '@angular/core/testing';

import { NhanXetService } from './nhan-xet.service';

describe('NhanXetService', () => {
  let service: NhanXetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhanXetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
