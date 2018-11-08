import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JLabEditComponent } from './jlab-edit.component';

describe('JLabEditComponent', () => {
  let component: JLabEditComponent;
  let fixture: ComponentFixture<JLabEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JLabEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JLabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
