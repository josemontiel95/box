import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLlenaRevenimientoComponent } from './crear-llenaRevenimiento.component';

describe('CrearLlenaRevenimientoComponent', () => {
  let component: CrearLlenaRevenimientoComponent;
  let fixture: ComponentFixture<CrearLlenaRevenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearLlenaRevenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearLlenaRevenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
