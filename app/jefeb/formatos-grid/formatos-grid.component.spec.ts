import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatosGridComponent } from './formatos-grid.component';

describe('FormatosGridComponent', () => {
  let component: FormatosGridComponent;
  let fixture: ComponentFixture<FormatosGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatosGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatosGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
