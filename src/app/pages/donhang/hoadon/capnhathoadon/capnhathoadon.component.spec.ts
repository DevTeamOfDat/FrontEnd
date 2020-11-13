import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhathoadonComponent } from './capnhathoadon.component';

describe('CapnhathoadonComponent', () => {
  let component: CapnhathoadonComponent;
  let fixture: ComponentFixture<CapnhathoadonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhathoadonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhathoadonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
