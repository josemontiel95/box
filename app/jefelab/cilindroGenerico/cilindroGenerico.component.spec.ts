import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CilindroGenericoComponent } from './cilindroGenerico.component';

describe('CilindroGenericoComponent', () => {
  let component: CilindroGenericoComponent;
  let fixture: ComponentFixture<CilindroGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CilindroGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CilindroGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
