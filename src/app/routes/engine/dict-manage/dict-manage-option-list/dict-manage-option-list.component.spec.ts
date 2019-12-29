import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictManageOptionListComponent } from './dict-manage-option-list.component';

describe('DictManageOptionListComponent', () => {
  let component: DictManageOptionListComponent;
  let fixture: ComponentFixture<DictManageOptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictManageOptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictManageOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
