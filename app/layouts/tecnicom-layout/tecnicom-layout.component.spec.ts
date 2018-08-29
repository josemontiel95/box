import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoMLayoutComponent } from './tecnicom-layout.component';

describe('TecnicoMLayoutComponent', () => {
  let component: TecnicoMLayoutComponent;
  let fixture: ComponentFixture<TecnicoMLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicoMLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicoMLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
