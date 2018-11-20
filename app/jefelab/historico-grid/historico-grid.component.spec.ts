import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoGridComponent } from './historico-grid.component';

describe('HistoricoGridComponent', () => {
  let component: HistoricoGridComponent;
  let fixture: ComponentFixture<HistoricoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
