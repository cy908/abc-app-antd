import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLogInfoComponent } from './access-log-info.component';

describe('AccessLogInfoComponent', () => {
  let component: AccessLogInfoComponent;
  let fixture: ComponentFixture<AccessLogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessLogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessLogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
