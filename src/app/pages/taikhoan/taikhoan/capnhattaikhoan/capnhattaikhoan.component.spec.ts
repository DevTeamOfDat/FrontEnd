import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhattaikhoanComponent } from './capnhattaikhoan.component';

describe('CapnhattaikhoanComponent', () => {
  let component: CapnhattaikhoanComponent;
  let fixture: ComponentFixture<CapnhattaikhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhattaikhoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhattaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
