import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatkhuyenmaisanphamComponent } from './capnhatkhuyenmaisanpham.component';

describe('CapnhatkhuyenmaisanphamComponent', () => {
  let component: CapnhatkhuyenmaisanphamComponent;
  let fixture: ComponentFixture<CapnhatkhuyenmaisanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatkhuyenmaisanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatkhuyenmaisanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
