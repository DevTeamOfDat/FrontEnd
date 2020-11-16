import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaohoadonComponent } from './baocaohoadon.component';

describe('BaocaohoadonComponent', () => {
  let component: BaocaohoadonComponent;
  let fixture: ComponentFixture<BaocaohoadonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaocaohoadonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaohoadonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
