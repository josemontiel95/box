import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FechasGridComponent } from './fechasgrid.component';

describe('FechasGridComponent', () => {
  let component: FechasGridComponent;
  let fixture: ComponentFixture<FechasGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechasGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechasGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
