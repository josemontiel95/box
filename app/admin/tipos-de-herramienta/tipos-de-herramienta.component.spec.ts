import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDeHerramientaComponent } from './tipos-de-herramienta.component';

describe('TiposDeHerramientaComponent', () => {
  let component: TiposDeHerramientaComponent;
  let fixture: ComponentFixture<TiposDeHerramientaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposDeHerramientaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposDeHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
