import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeLogListComponent } from './notice-log-list.component';

describe('NoticeLogListComponent', () => {
  let component: NoticeLogListComponent;
  let fixture: ComponentFixture<NoticeLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
