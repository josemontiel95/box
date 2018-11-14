import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCuboComponent } from './grid-cubo.component';

describe('GridCuboComponent', () => {
  let component: GridCuboComponent;
  let fixture: ComponentFixture<GridCuboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCuboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCuboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
