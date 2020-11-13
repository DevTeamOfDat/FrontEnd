import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachtaikhoanComponent } from './danhsachtaikhoan.component';

describe('DanhsachtaikhoanComponent', () => {
  let component: DanhsachtaikhoanComponent;
  let fixture: ComponentFixture<DanhsachtaikhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachtaikhoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachtaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
