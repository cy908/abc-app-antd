import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeManageListComponent } from './notice-manage-list.component';

describe('NoticeManageListComponent', () => {
  let component: NoticeManageListComponent;
  let fixture: ComponentFixture<NoticeManageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeManageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
