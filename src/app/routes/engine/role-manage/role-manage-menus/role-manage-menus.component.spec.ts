import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManageMenusComponent } from './role-manage-menus.component';

describe('RoleManageMenusComponent', () => {
  let component: RoleManageMenusComponent;
  let fixture: ComponentFixture<RoleManageMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManageMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManageMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
