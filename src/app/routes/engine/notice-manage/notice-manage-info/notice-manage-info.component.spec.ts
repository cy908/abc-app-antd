import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeManageInfoComponent } from './notice-manage-info.component';

describe('NoticeManageInfoComponent', () => {
  let component: NoticeManageInfoComponent;
  let fixture: ComponentFixture<NoticeManageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeManageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeManageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
