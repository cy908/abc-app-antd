import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentManageAddComponent } from './department-manage-add.component';

describe('DepartmentManageAddComponent', () => {
  let component: DepartmentManageAddComponent;
  let fixture: ComponentFixture<DepartmentManageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentManageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
