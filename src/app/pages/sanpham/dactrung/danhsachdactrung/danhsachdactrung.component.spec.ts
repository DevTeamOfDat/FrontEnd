import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachdactrungComponent } from './danhsachdactrung.component';

describe('DanhsachdactrungComponent', () => {
  let component: DanhsachdactrungComponent;
  let fixture: ComponentFixture<DanhsachdactrungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachdactrungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachdactrungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
