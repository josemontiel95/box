import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoCCHGridComponent } from './formato-cch-grid.component';

describe('FormatoCCHGridComponent', () => {
  let component: FormatoCCHGridComponent;
  let fixture: ComponentFixture<FormatoCCHGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatoCCHGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatoCCHGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
