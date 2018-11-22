import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JLabHistoricoComponent } from './historico.component';

describe('JLabHistoricoComponent', () => {
  let component: JLabHistoricoComponent;
  let fixture: ComponentFixture<JLabHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JLabHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JLabHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
