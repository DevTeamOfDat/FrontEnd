import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatloaitaikhoanComponent } from './capnhatloaitaikhoan.component';

describe('CapnhatloaitaikhoanComponent', () => {
  let component: CapnhatloaitaikhoanComponent;
  let fixture: ComponentFixture<CapnhatloaitaikhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatloaitaikhoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatloaitaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
