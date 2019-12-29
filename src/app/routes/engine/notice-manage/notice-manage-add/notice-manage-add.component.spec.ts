import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeManageAddComponent } from './notice-manage-add.component';

describe('NoticeManageAddComponent', () => {
  let component: NoticeManageAddComponent;
  let fixture: ComponentFixture<NoticeManageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeManageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
