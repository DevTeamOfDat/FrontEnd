import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatloaisanphamComponent } from './capnhatloaisanpham.component';

describe('CapnhatloaisanphamComponent', () => {
  let component: CapnhatloaisanphamComponent;
  let fixture: ComponentFixture<CapnhatloaisanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatloaisanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatloaisanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
