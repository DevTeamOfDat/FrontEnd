import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachtrangthaiComponent } from './danhsachtrangthai.component';

describe('DanhsachtrangthaiComponent', () => {
  let component: DanhsachtrangthaiComponent;
  let fixture: ComponentFixture<DanhsachtrangthaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachtrangthaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachtrangthaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
