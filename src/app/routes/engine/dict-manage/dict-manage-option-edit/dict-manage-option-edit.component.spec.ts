import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictManageOptionEditComponent } from './dict-manage-option-edit.component';

describe('DictManageOptionEditComponent', () => {
  let component: DictManageOptionEditComponent;
  let fixture: ComponentFixture<DictManageOptionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictManageOptionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictManageOptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
