import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoOrdenTrabajoComponent } from './historico-orden.component';

describe('HistoricoOrdenTrabajoComponent', () => {
  let component: HistoricoOrdenTrabajoComponent;
  let fixture: ComponentFixture<HistoricoOrdenTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoOrdenTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
