import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { footerEnsayoComponent } from './footerEnsayo.component';

describe('footerEnsayoComponent', () => {
  let component: footerEnsayoComponent;
  let fixture: ComponentFixture<footerEnsayoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ footerEnsayoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(footerEnsayoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
