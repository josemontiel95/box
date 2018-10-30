import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuboGenericoComponent } from './cuboGenerico.component';

describe('v', () => {
  let component: CuboGenericoComponent;
  let fixture: ComponentFixture<CuboGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuboGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuboGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
