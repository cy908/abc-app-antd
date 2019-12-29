import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictManageOptionInfoComponent } from './dict-manage-option-info.component';

describe('DictManageOptionInfoComponent', () => {
  let component: DictManageOptionInfoComponent;
  let fixture: ComponentFixture<DictManageOptionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictManageOptionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictManageOptionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
