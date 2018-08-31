import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluaHerraComponent } from './evaluaherra.component';

describe('EvaluaHerraComponent', () => {
  let component: EvaluaHerraComponent;
  let fixture: ComponentFixture<EvaluaHerraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluaHerraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluaHerraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
