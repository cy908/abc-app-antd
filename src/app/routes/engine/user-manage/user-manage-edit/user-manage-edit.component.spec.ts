import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageEditComponent } from './user-manage-edit.component';

describe('UserManageEditComponent', () => {
  let component: UserManageEditComponent;
  let fixture: ComponentFixture<UserManageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
