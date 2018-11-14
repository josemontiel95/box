import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigaGenericoComponent } from './vigaGenerico.component';

describe('VigaGenericoComponent', () => {
  let component: VigaGenericoComponent;
  let fixture: ComponentFixture<VigaGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigaGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigaGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
