import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatdactrungComponent } from './capnhatdactrung.component';

describe('CapnhatdactrungComponent', () => {
  let component: CapnhatdactrungComponent;
  let fixture: ComponentFixture<CapnhatdactrungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapnhatdactrungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatdactrungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
