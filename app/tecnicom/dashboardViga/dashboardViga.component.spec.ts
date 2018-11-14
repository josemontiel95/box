import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { dashboardVigaComponent } from './dashboardViga.component';

describe('dashboardVigaComponent', () => {
  let component: dashboardVigaComponent;
  let fixture: ComponentFixture<dashboardVigaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ dashboardVigaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dashboardVigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
