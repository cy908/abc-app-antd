import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentManageListComponent } from './department-manage-list.component';

describe('DepartmentManageListComponent', () => {
  let component: DepartmentManageListComponent;
  let fixture: ComponentFixture<DepartmentManageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentManageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
