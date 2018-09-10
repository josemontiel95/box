import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { agregaRegistroRevenimientoComponent } from './agregaRegistroRevenimiento.component';

describe('agregaRegistroRevenimientoComponent', () => {
  let component: agregaRegistroRevenimientoComponent;
  let fixture: ComponentFixture<agregaRegistroRevenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ agregaRegistroRevenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(agregaRegistroRevenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
