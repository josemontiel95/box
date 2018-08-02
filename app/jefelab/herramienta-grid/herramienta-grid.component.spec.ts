import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientaGridComponent } from './herramienta-grid.component';

describe('HerramientaGridComponent', () => {
  let component: HerramientaGridComponent;
  let fixture: ComponentFixture<HerramientaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerramientaGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerramientaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
