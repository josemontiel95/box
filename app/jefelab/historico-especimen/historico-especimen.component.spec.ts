import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoEspecimenComponent } from './historico-especimen.component';

describe('HistoricoEspecimenComponent', () => {
  let component: HistoricoEspecimenComponent;
  let fixture: ComponentFixture<HistoricoEspecimenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoEspecimenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoEspecimenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
