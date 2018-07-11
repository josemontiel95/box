import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JefebLayoutComponent } from './jefeb-layout.component';

describe('JefebLayoutComponent', () => {
  let component: JefebLayoutComponent;
  let fixture: ComponentFixture<JefebLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JefebLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JefebLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
