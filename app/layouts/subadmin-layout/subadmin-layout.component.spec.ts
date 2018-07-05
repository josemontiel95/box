import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminLayoutComponent } from './subadmin-layout.component';

describe('SubAdminLayoutComponent', () => {
  let component: SubAdminLayoutComponent;
  let fixture: ComponentFixture<SubAdminLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAdminLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
