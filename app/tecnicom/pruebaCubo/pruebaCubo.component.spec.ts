import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaCuboComponent } from './pruebaCubo.component';

describe('PruebaCuboComponent', () => {
  let component: PruebaCuboComponent;
  let fixture: ComponentFixture<PruebaCuboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaCuboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaCuboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
