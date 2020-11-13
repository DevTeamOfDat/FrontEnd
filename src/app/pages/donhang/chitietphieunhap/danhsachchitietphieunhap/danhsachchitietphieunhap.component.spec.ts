import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachchitietphieunhapComponent } from './danhsachchitietphieunhap.component';

describe('DanhsachchitietphieunhapComponent', () => {
  let component: DanhsachchitietphieunhapComponent;
  let fixture: ComponentFixture<DanhsachchitietphieunhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachchitietphieunhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachchitietphieunhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
