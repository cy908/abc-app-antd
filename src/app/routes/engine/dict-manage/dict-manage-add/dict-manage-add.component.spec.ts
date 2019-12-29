import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictManageAddComponent } from './dict-manage-add.component';

describe('DictManageAddComponent', () => {
  let component: DictManageAddComponent;
  let fixture: ComponentFixture<DictManageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictManageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
