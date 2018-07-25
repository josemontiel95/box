import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeLabLayoutComponent } from './jefelab-layout.component';

describe('JefeLabLayoutComponent', () => {
  let component: JefeLabLayoutComponent;
  let fixture: ComponentFixture<JefeLabLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JefeLabLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JefeLabLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
