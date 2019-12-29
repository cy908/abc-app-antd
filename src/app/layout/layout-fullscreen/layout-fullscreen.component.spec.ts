import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFullscreenComponent } from './layout-fullscreen.component';

describe('LayoutFullscreenComponent', () => {
  let component: LayoutFullscreenComponent;
  let fixture: ComponentFixture<LayoutFullscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutFullscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
