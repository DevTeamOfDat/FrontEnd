import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhinhanhsanphamComponent } from './danhsachhinhanhsanpham.component';

describe('DanhsachhinhanhsanphamComponent', () => {
  let component: DanhsachhinhanhsanphamComponent;
  let fixture: ComponentFixture<DanhsachhinhanhsanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachhinhanhsanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhinhanhsanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
