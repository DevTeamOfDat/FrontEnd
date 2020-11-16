import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaophieunhapComponent } from './baocaophieunhap.component';

describe('BaocaophieunhapComponent', () => {
  let component: BaocaophieunhapComponent;
  let fixture: ComponentFixture<BaocaophieunhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaocaophieunhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaophieunhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
