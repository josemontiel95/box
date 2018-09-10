import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientaDetailComponent } from './herramienta-detail.component';

describe('HerramientaDetailComponent', () => {
  let component: HerramientaDetailComponent;
  let fixture: ComponentFixture<HerramientaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerramientaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerramientaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
