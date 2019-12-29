import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeInfoComponent } from './notice-info.component';

describe('NoticeInfoComponent', () => {
  let component: NoticeInfoComponent;
  let fixture: ComponentFixture<NoticeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
