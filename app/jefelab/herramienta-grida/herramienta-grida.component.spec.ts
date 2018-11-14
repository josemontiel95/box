import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientaGridAgregaComponent } from './herramienta-grida.component';

describe('HerramientaGridAgregaComponent', () => {
  let component: HerramientaGridAgregaComponent;
  let fixture: ComponentFixture<HerramientaGridAgregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerramientaGridAgregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerramientaGridAgregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
