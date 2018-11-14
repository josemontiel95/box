import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoHerramientasComponent } from './crear-tipo-de-herramienta.component';

describe('CrearTipoHerramientasComponent', () => {
  let component: CrearTipoHerramientasComponent;
  let fixture: ComponentFixture<CrearTipoHerramientasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTipoHerramientasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTipoHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
