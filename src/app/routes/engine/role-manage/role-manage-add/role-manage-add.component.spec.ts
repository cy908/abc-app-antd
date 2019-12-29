import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManageAddComponent } from './role-manage-add.component';

describe('RoleManageAddComponent', () => {
  let component: RoleManageAddComponent;
  let fixture: ComponentFixture<RoleManageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
