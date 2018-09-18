import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCilindrosComponent } from './grid-cilindros.component';

describe('GridCilindrosComponent', () => {
  let component: GridCilindrosComponent;
  let fixture: ComponentFixture<GridCilindrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCilindrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCilindrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
