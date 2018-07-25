import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarJefeLabComponent } from './sidebarjefelab.component';

describe('SidebarJefeLabComponent', () => {
  let component: SidebarJefeLabComponent;
  let fixture: ComponentFixture<SidebarJefeLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarJefeLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarJefeLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
