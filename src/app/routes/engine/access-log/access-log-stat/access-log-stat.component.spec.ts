import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLogStatComponent } from './access-log-stat.component';

describe('AccessLogStatComponent', () => {
  let component: AccessLogStatComponent;
  let fixture: ComponentFixture<AccessLogStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessLogStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessLogStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
