import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachkhuyenmaisanphamComponent } from './danhsachkhuyenmaisanpham.component';

describe('DanhsachkhuyenmaisanphamComponent', () => {
  let component: DanhsachkhuyenmaisanphamComponent;
  let fixture: ComponentFixture<DanhsachkhuyenmaisanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachkhuyenmaisanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachkhuyenmaisanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
