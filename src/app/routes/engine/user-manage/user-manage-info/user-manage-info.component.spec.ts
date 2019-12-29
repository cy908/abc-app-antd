import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageInfoComponent } from './user-manage-info.component';

describe('UserManageInfoComponent', () => {
  let component: UserManageInfoComponent;
  let fixture: ComponentFixture<UserManageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
