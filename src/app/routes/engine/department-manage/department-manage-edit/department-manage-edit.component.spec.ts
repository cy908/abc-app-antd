import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentManageEditComponent } from './department-manage-edit.component';

describe('DepartmentManageEditComponent', () => {
  let component: DepartmentManageEditComponent;
  let fixture: ComponentFixture<DepartmentManageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentManageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
