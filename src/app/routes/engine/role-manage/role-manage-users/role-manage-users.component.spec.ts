import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManageUsersComponent } from './role-manage-users.component';

describe('RoleManageUsersComponent', () => {
  let component: RoleManageUsersComponent;
  let fixture: ComponentFixture<RoleManageUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManageUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
