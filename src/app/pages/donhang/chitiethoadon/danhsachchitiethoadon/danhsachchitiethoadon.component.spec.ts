import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachchitiethoadonComponent } from './danhsachchitiethoadon.component';

describe('DanhsachchitiethoadonComponent', () => {
  let component: DanhsachchitiethoadonComponent;
  let fixture: ComponentFixture<DanhsachchitiethoadonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachchitiethoadonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachchitiethoadonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
