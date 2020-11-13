import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatdactrungsanphamComponent } from './capnhatdactrungsanpham.component';

describe('CapnhatdactrungsanphamComponent', () => {
  let component: CapnhatdactrungsanphamComponent;
  let fixture: ComponentFixture<CapnhatdactrungsanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatdactrungsanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatdactrungsanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
