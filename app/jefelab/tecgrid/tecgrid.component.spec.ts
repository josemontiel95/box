import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecGridComponent } from './tecgrid.component';

describe('TecGridComponent', () => {
  let component: TecGridComponent;
  let fixture: ComponentFixture<TecGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
