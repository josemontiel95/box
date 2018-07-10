import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarJefebComponent } from './sidebarjefeb.component';

describe('SidebarJefebComponent', () => {
  let component: SidebarJefebComponent;
  let fixture: ComponentFixture<SidebarJefebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarJefebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarJefebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
