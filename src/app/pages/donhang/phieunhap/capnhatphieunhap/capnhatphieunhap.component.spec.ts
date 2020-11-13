import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatphieunhapComponent } from './capnhatphieunhap.component';

describe('CapnhatphieunhapComponent', () => {
  let component: CapnhatphieunhapComponent;
  let fixture: ComponentFixture<CapnhatphieunhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatphieunhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatphieunhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
