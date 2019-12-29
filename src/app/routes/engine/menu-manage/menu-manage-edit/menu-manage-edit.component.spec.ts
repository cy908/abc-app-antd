import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManageEditComponent } from './menu-manage-edit.component';

describe('MenuManageEditComponent', () => {
  let component: MenuManageEditComponent;
  let fixture: ComponentFixture<MenuManageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuManageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
