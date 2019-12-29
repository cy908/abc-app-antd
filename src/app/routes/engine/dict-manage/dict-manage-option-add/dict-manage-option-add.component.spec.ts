import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictManageOptionAddComponent } from './dict-manage-option-add.component';

describe('DictManageOptionAddComponent', () => {
  let component: DictManageOptionAddComponent;
  let fixture: ComponentFixture<DictManageOptionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictManageOptionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictManageOptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
