import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManageInfoComponent } from './role-manage-info.component';

describe('RoleManageInfoComponent', () => {
  let component: RoleManageInfoComponent;
  let fixture: ComponentFixture<RoleManageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
