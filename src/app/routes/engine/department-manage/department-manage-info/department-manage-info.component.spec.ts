import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentManageInfoComponent } from './department-manage-info.component';

describe('DepartmentManageInfoComponent', () => {
  let component: DepartmentManageInfoComponent;
  let fixture: ComponentFixture<DepartmentManageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentManageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentManageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
