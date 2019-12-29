import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictManageEditComponent } from './dict-manage-edit.component';

describe('DictManageEditComponent', () => {
  let component: DictManageEditComponent;
  let fixture: ComponentFixture<DictManageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictManageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
