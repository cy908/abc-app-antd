import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeManageEditComponent } from './notice-manage-edit.component';

describe('NoticeManageEditComponent', () => {
  let component: NoticeManageEditComponent;
  let fixture: ComponentFixture<NoticeManageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeManageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
