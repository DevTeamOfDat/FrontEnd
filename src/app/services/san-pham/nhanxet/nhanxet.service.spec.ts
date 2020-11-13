import { TestBed } from '@angular/core/testing';

import { NhanxetService } from './nhanxet.service';

describe('NhanxetService', () => {
  let service: NhanxetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhanxetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
