import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictManageInfoComponent } from './dict-manage-info.component';

describe('DictManageInfoComponent', () => {
  let component: DictManageInfoComponent;
  let fixture: ComponentFixture<DictManageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictManageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictManageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
