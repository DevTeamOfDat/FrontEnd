import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhattintucComponent } from './capnhattintuc.component';

describe('CapnhattintucComponent', () => {
  let component: CapnhattintucComponent;
  let fixture: ComponentFixture<CapnhattintucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhattintucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhattintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
