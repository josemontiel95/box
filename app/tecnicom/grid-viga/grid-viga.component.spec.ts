import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridVigaComponent } from './grid-viga.component';

describe('GridVigaComponent', () => {
  let component: GridVigaComponent;
  let fixture: ComponentFixture<GridVigaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridVigaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridVigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
