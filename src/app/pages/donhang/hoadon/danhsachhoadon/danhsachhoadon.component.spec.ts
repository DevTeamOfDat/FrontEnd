import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhoadonComponent } from './danhsachhoadon.component';

describe('DanhsachhoadonComponent', () => {
  let component: DanhsachhoadonComponent;
  let fixture: ComponentFixture<DanhsachhoadonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachhoadonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhoadonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
