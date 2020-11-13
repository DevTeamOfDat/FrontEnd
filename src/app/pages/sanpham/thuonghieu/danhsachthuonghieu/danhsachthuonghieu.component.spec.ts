import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachthuonghieuComponent } from './danhsachthuonghieu.component';

describe('DanhsachthuonghieuComponent', () => {
  let component: DanhsachthuonghieuComponent;
  let fixture: ComponentFixture<DanhsachthuonghieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachthuonghieuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachthuonghieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
