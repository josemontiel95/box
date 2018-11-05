import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JLabPendientesComponent } from './pendientes.component';

describe('JLabPendientesComponent', () => {
  let component: JLabPendientesComponent;
  let fixture: ComponentFixture<JLabPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JLabPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JLabPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
