import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcreteraComponent } from './concretera.component';

describe('ConcreteraComponent', () => {
  let component: ConcreteraComponent;
  let fixture: ComponentFixture<ConcreteraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcreteraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcreteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
