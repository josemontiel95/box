import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHerramientasComponent } from './crear-herramientas.component';

describe('CrearHerramientasComponent', () => {
  let component: CrearHerramientasComponent;
  let fixture: ComponentFixture<CrearHerramientasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearHerramientasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
