import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageListComponent } from './user-manage-list.component';

describe('UserManageListComponent', () => {
  let component: UserManageListComponent;
  let fixture: ComponentFixture<UserManageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
