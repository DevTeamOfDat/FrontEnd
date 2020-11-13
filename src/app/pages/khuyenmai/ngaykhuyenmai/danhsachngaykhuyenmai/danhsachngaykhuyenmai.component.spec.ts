import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachngaykhuyenmaiComponent } from './danhsachngaykhuyenmai.component';

describe('DanhsachngaykhuyenmaiComponent', () => {
  let component: DanhsachngaykhuyenmaiComponent;
  let fixture: ComponentFixture<DanhsachngaykhuyenmaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachngaykhuyenmaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachngaykhuyenmaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
