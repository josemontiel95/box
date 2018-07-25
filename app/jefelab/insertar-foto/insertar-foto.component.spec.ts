import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarFotoComponent } from './insertar-foto.component';

describe('InsertarFotoComponent', () => {
  let component: InsertarFotoComponent;
  let fixture: ComponentFixture<InsertarFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
