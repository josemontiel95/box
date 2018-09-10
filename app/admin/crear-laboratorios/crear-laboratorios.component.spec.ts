import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLaboratoriosComponent } from './crear-laboratorios.component';

describe('CrearLaboratoriosComponent', () => {
  let component: CrearLaboratoriosComponent;
  let fixture: ComponentFixture<CrearLaboratoriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearLaboratoriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearLaboratoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
