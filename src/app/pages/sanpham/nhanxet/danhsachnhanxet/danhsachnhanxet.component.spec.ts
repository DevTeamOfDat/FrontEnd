import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachnhanxetComponent } from './danhsachnhanxet.component';

describe('DanhsachnhanxetComponent', () => {
  let component: DanhsachnhanxetComponent;
  let fixture: ComponentFixture<DanhsachnhanxetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachnhanxetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachnhanxetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
