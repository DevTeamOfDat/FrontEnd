import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachtintucComponent } from './danhsachtintuc.component';

describe('DanhsachtintucComponent', () => {
  let component: DanhsachtintucComponent;
  let fixture: ComponentFixture<DanhsachtintucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachtintucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachtintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
