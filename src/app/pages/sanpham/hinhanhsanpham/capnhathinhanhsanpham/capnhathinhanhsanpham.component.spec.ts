import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhathinhanhsanphamComponent } from './capnhathinhanhsanpham.component';

describe('CapnhathinhanhsanphamComponent', () => {
  let component: CapnhathinhanhsanphamComponent;
  let fixture: ComponentFixture<CapnhathinhanhsanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhathinhanhsanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhathinhanhsanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
