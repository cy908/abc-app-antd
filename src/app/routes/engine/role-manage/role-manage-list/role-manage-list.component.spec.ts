import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManageListComponent } from './role-manage-list.component';

describe('RoleManageListComponent', () => {
  let component: RoleManageListComponent;
  let fixture: ComponentFixture<RoleManageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
