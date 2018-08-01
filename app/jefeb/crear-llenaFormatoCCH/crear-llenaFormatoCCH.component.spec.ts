import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLlenaFormatoCCHComponent } from './crear-llenaFormatoCCH.component';

describe('CrearLlenaFormatoCCHComponent', () => {
  let component: CrearLlenaFormatoCCHComponent;
  let fixture: ComponentFixture<CrearLlenaFormatoCCHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearLlenaFormatoCCHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearLlenaFormatoCCHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
