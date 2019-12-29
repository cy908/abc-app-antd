import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManageInfoComponent } from './menu-manage-info.component';

describe('MenuManageInfoComponent', () => {
  let component: MenuManageInfoComponent;
  let fixture: ComponentFixture<MenuManageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuManageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuManageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
