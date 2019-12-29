import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageAddComponent } from './user-manage-add.component';

describe('UserManageAddComponent', () => {
  let component: UserManageAddComponent;
  let fixture: ComponentFixture<UserManageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
