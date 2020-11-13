import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhattrangthaiComponent } from './capnhattrangthai.component';

describe('CapnhattrangthaiComponent', () => {
  let component: CapnhattrangthaiComponent;
  let fixture: ComponentFixture<CapnhattrangthaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhattrangthaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhattrangthaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
