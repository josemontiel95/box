import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarDocumentoComponent } from './insertar-foto.component';

describe('InsertarDocumentoComponent', () => {
  let component: InsertarDocumentoComponent;
  let fixture: ComponentFixture<InsertarDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
