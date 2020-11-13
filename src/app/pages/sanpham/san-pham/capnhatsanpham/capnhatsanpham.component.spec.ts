import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatsanphamComponent } from './capnhatsanpham.component';

describe('CapnhatsanphamComponent', () => {
  let component: CapnhatsanphamComponent;
  let fixture: ComponentFixture<CapnhatsanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatsanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatsanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
