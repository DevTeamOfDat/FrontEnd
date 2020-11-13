import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatnhacungcapComponent } from './capnhatnhacungcap.component';

describe('CapnhatnhacungcapComponent', () => {
  let component: CapnhatnhacungcapComponent;
  let fixture: ComponentFixture<CapnhatnhacungcapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatnhacungcapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatnhacungcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
