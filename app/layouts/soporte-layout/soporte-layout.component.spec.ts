import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteLayoutComponent } from './soporte-layout.component';

describe('SoporteLayoutComponent', () => {
  let component: SoporteLayoutComponent;
  let fixture: ComponentFixture<SoporteLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoporteLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoporteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
