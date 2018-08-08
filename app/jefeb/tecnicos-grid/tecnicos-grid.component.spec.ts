import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosGridComponent } from './tecnicos-grid.component';

describe('TecnicosGridComponent', () => {
  let component: TecnicosGridComponent;
  let fixture: ComponentFixture<TecnicosGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicosGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicosGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
