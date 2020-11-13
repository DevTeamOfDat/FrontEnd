import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatchitietphieunhapComponent } from './capnhatchitietphieunhap.component';

describe('CapnhatchitietphieunhapComponent', () => {
  let component: CapnhatchitietphieunhapComponent;
  let fixture: ComponentFixture<CapnhatchitietphieunhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatchitietphieunhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatchitietphieunhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
