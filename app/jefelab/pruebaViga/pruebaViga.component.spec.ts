import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaVigaComponent } from './pruebaViga.component';

describe('PruebaVigaComponent', () => {
  let component: PruebaVigaComponent;
  let fixture: ComponentFixture<PruebaVigaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaVigaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaVigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
