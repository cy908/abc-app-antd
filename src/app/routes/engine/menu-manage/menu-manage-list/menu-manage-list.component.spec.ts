import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManageListComponent } from './menu-manage-list.component';

describe('MenuManageListComponent', () => {
  let component: MenuManageListComponent;
  let fixture: ComponentFixture<MenuManageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuManageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
