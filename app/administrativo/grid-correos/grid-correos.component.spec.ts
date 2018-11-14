import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCorreosComponent } from './grid-cubo.component';

describe('GridCorreosComponent', () => {
  let component: GridCorreosComponent;
  let fixture: ComponentFixture<GridCorreosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCorreosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
