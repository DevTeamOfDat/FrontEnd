import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachloaisanphamComponent } from './danhsachloaisanpham.component';

describe('DanhsachloaisanphamComponent', () => {
  let component: DanhsachloaisanphamComponent;
  let fixture: ComponentFixture<DanhsachloaisanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachloaisanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachloaisanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
