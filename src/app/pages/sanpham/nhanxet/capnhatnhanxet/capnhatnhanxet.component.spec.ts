import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatnhanxetComponent } from './capnhatnhanxet.component';

describe('CapnhatnhanxetComponent', () => {
  let component: CapnhatnhanxetComponent;
  let fixture: ComponentFixture<CapnhatnhanxetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatnhanxetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatnhanxetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
