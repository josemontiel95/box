import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { dashboardCilindroComponent } from './dashboardCilindro.component';

describe('dashboardCilindroComponent', () => {
  let component: dashboardCilindroComponent;
  let fixture: ComponentFixture<dashboardCilindroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ dashboardCilindroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dashboardCilindroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
