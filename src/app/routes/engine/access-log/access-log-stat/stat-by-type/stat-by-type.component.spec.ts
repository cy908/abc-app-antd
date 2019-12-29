import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatByTypeComponent } from './stat-by-type.component';

describe('StatByTypeComponent', () => {
  let component: StatByTypeComponent;
  let fixture: ComponentFixture<StatByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
