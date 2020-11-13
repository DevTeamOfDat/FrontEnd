import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachdactrungsanphamComponent } from './danhsachdactrungsanpham.component';

describe('DanhsachdactrungsanphamComponent', () => {
  let component: DanhsachdactrungsanphamComponent;
  let fixture: ComponentFixture<DanhsachdactrungsanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachdactrungsanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachdactrungsanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
