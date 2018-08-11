import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosGridAgregaComponent } from './tecnicos-grida.component';

describe('TecnicosGridAgregaComponent', () => {
  let component: TecnicosGridAgregaComponent;
  let fixture: ComponentFixture<TecnicosGridAgregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicosGridAgregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicosGridAgregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
