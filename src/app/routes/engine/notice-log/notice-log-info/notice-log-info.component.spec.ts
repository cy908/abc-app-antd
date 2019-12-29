import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeLogInfoComponent } from './notice-log-info.component';

describe('NoticeLogInfoComponent', () => {
  let component: NoticeLogInfoComponent;
  let fixture: ComponentFixture<NoticeLogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeLogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeLogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
