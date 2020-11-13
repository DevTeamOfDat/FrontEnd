import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatthuonghieuComponent } from './capnhatthuonghieu.component';

describe('CapnhatthuonghieuComponent', () => {
  let component: CapnhatthuonghieuComponent;
  let fixture: ComponentFixture<CapnhatthuonghieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatthuonghieuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatthuonghieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
