import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBrandingAreaComponent } from './site-branding-area.component';

describe('SiteBrandingAreaComponent', () => {
  let component: SiteBrandingAreaComponent;
  let fixture: ComponentFixture<SiteBrandingAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteBrandingAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteBrandingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
