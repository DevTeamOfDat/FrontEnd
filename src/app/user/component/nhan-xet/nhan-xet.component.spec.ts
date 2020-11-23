import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanXetComponent } from './nhan-xet.component';

describe('NhanXetComponent', () => {
  let component: NhanXetComponent;
  let fixture: ComponentFixture<NhanXetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhanXetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanXetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
