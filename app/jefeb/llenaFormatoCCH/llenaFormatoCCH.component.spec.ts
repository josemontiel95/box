import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { llenaFormatoCCHComponent } from './llenaFormatoCCH.component';

describe('llenaFormatoCCHComponent', () => {
  let component: llenaFormatoCCHComponent;
  let fixture: ComponentFixture<llenaFormatoCCHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ llenaFormatoCCHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(llenaFormatoCCHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
