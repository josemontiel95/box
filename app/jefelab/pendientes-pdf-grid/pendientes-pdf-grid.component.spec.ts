import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendientesPDFGridComponent } from './pendientes-pdf-grid.component';

describe('PendientesPDFGridComponent', () => {
  let component: PendientesPDFGridComponent;
  let fixture: ComponentFixture<PendientesPDFGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendientesPDFGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendientesPDFGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
