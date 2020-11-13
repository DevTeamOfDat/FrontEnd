import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachloaidonComponent } from './danhsachloaidon.component';

describe('DanhsachloaidonComponent', () => {
  let component: DanhsachloaidonComponent;
  let fixture: ComponentFixture<DanhsachloaidonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachloaidonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachloaidonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
