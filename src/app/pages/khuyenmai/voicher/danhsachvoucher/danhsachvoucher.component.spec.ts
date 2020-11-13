import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachvoucherComponent } from './danhsachvoucher.component';

describe('DanhsachvoucherComponent', () => {
  let component: DanhsachvoucherComponent;
  let fixture: ComponentFixture<DanhsachvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachvoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
