import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarFotoClienteComponent } from './insertar-fotocliente.component';

describe('InsertarFotoClienteComponent', () => {
  let component: InsertarFotoClienteComponent;
  let fixture: ComponentFixture<InsertarFotoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarFotoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarFotoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
