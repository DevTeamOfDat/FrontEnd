import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachphieunhapComponent } from './danhsachphieunhap.component';

describe('DanhsachphieunhapComponent', () => {
  let component: DanhsachphieunhapComponent;
  let fixture: ComponentFixture<DanhsachphieunhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachphieunhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachphieunhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
