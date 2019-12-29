import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManageAddComponent } from './menu-manage-add.component';

describe('MenuManageAddComponent', () => {
  let component: MenuManageAddComponent;
  let fixture: ComponentFixture<MenuManageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuManageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
