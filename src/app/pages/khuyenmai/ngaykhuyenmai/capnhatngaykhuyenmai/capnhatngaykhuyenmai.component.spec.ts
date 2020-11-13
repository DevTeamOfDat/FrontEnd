import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatngaykhuyenmaiComponent } from './capnhatngaykhuyenmai.component';

describe('CapnhatngaykhuyenmaiComponent', () => {
  let component: CapnhatngaykhuyenmaiComponent;
  let fixture: ComponentFixture<CapnhatngaykhuyenmaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatngaykhuyenmaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatngaykhuyenmaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
