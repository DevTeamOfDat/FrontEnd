import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaonhanvienComponent } from './baocaonhanvien.component';

describe('BaocaonhanvienComponent', () => {
  let component: BaocaonhanvienComponent;
  let fixture: ComponentFixture<BaocaonhanvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaocaonhanvienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaonhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
