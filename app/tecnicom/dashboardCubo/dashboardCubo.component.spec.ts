import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { dashboardCuboComponent } from './dashboardCubo.component';

describe('dashboardCuboComponent', () => {
  let component: dashboardCuboComponent;
  let fixture: ComponentFixture<dashboardCuboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ dashboardCuboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dashboardCuboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
