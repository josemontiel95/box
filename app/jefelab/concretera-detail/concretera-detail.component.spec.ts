import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcreteraDetailComponent } from './concretera-detail.component';

describe('ConcreteraDetailComponent', () => {
  let component: ConcreteraDetailComponent;
  let fixture: ComponentFixture<ConcreteraDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcreteraDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcreteraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
