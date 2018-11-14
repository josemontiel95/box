import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoHerramientaDetailComponent } from './tipo-de-herramienta-detail.component';

describe('TipoHerramientaDetailComponent', () => {
  let component: TipoHerramientaDetailComponent;
  let fixture: ComponentFixture<TipoHerramientaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoHerramientaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoHerramientaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
