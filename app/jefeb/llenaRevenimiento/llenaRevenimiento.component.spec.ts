import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { llenaRevenimientoComponent } from './llenaRevenimiento.component';

describe('llenaRevenimientoComponent', () => {
  let component: llenaRevenimientoComponent;
  let fixture: ComponentFixture<llenaRevenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ llenaRevenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(llenaRevenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
