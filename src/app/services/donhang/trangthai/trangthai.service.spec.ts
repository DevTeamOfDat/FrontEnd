import { TestBed } from '@angular/core/testing';

import { TrangthaiService } from './trangthai.service';

describe('TrangthaiService', () => {
  let service: TrangthaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrangthaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
