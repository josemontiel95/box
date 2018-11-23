import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFiltradoObrasComponent } from './historico-filtrado-obras.component';

describe('HistoricoFiltradoObrasComponent', () => {
  let component: HistoricoFiltradoObrasComponent;
  let fixture: ComponentFixture<HistoricoFiltradoObrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoFiltradoObrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoFiltradoObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
