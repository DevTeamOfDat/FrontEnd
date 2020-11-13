import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachloaitaikhoanComponent } from './danhsachloaitaikhoan.component';

describe('DanhsachloaitaikhoanComponent', () => {
  let component: DanhsachloaitaikhoanComponent;
  let fixture: ComponentFixture<DanhsachloaitaikhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachloaitaikhoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachloaitaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
