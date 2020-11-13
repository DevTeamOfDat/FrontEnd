import { TestBed } from '@angular/core/testing';

import { NhaCungCapService } from './nha-cung-cap.service';

describe('NhaCungCapService', () => {
  let service: NhaCungCapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhaCungCapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
