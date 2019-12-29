import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictManageListComponent } from './dict-manage-list.component';

describe('DictManageListComponent', () => {
  let component: DictManageListComponent;
  let fixture: ComponentFixture<DictManageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictManageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
