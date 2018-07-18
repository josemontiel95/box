import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraDetailComponent } from './obra-detail.component';

describe('UserProfileComponent', () => {
  let component: ObraDetailComponent;
  let fixture: ComponentFixture<ObraDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObraDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
