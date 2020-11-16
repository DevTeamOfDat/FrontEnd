import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaohangtonkhoComponent } from './baocaohangtonkho.component';

describe('BaocaohangtonkhoComponent', () => {
  let component: BaocaohangtonkhoComponent;
  let fixture: ComponentFixture<BaocaohangtonkhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaocaohangtonkhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaohangtonkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
