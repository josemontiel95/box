import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdtEdicionGridComponent } from './odt-edicion-grid.component';

describe('OdtEdicionGridComponent', () => {
  let component: OdtEdicionGridComponent;
  let fixture: ComponentFixture<OdtEdicionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdtEdicionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdtEdicionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
