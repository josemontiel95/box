import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosRevGridComponent } from './registrosrev-grid.component';

describe('RegistrosRevGridComponent', () => {
  let component: RegistrosRevGridComponent;
  let fixture: ComponentFixture<RegistrosRevGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrosRevGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosRevGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
