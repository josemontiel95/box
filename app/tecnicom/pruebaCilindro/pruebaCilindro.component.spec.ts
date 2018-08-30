import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaCilindroComponent } from './pruebaCilindro.component';

describe('PruebaCilindroComponent', () => {
  let component: PruebaCilindroComponent;
  let fixture: ComponentFixture<PruebaCilindroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaCilindroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaCilindroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
