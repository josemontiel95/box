import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { dashboardLoteComponent } from './dashboardLote.component';

describe('dashboardLoteComponent', () => {
  let component: dashboardLoteComponent;
  let fixture: ComponentFixture<dashboardLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ dashboardLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dashboardLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
