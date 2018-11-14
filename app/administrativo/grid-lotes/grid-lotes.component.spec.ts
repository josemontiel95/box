import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLotesComponent } from './grid-cilindros.component';

describe('GridLotesComponent', () => {
  let component: GridLotesComponent;
  let fixture: ComponentFixture<GridLotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridLotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
