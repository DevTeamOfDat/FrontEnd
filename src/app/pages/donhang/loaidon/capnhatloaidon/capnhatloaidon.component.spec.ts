import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatloaidonComponent } from './capnhatloaidon.component';

describe('CapnhatloaidonComponent', () => {
  let component: CapnhatloaidonComponent;
  let fixture: ComponentFixture<CapnhatloaidonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatloaidonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatloaidonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
