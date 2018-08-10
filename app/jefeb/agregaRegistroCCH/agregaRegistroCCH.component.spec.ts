import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { agregaRegistroCCHComponent } from './agregaRegistroCCH.component';

describe('agregaRegistroCCHComponent', () => {
  let component: agregaRegistroCCHComponent;
  let fixture: ComponentFixture<agregaRegistroCCHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ agregaRegistroCCHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(agregaRegistroCCHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
