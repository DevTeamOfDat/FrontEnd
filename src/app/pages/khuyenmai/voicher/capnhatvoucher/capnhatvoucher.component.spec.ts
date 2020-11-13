import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatvoucherComponent } from './capnhatvoucher.component';

describe('CapnhatvoucherComponent', () => {
  let component: CapnhatvoucherComponent;
  let fixture: ComponentFixture<CapnhatvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatvoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
