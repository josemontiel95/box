import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFormatoComponent } from './historico-formato.component';

describe('HistoricoFormatoComponent', () => {
  let component: HistoricoFormatoComponent;
  let fixture: ComponentFixture<HistoricoFormatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoFormatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoFormatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
