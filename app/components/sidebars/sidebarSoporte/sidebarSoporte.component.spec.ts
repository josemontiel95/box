import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSoporteComponent } from './sidebarSoporte.component';

describe('SidebarSoporteComponent', () => {
  let component: SidebarSoporteComponent;
  let fixture: ComponentFixture<SidebarSoporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarSoporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
