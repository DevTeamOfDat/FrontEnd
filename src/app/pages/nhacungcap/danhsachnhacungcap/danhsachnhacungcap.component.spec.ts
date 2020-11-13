import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachnhacungcapComponent } from './danhsachnhacungcap.component';

describe('DanhsachnhacungcapComponent', () => {
  let component: DanhsachnhacungcapComponent;
  let fixture: ComponentFixture<DanhsachnhacungcapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachnhacungcapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachnhacungcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
