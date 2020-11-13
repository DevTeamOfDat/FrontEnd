import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatchitiethoadonComponent } from './capnhatchitiethoadon.component';

describe('CapnhatchitiethoadonComponent', () => {
  let component: CapnhatchitiethoadonComponent;
  let fixture: ComponentFixture<CapnhatchitiethoadonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapnhatchitiethoadonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatchitiethoadonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
