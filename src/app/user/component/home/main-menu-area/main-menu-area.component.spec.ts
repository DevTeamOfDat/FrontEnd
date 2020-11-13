import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuAreaComponent } from './main-menu-area.component';

describe('MainMenuAreaComponent', () => {
  let component: MainMenuAreaComponent;
  let fixture: ComponentFixture<MainMenuAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMenuAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
