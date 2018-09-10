import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTecnicoMComponent } from './sidebartecnicom.component';

describe('SidebarTecnicoMComponent', () => {
  let component: SidebarTecnicoMComponent;
  let fixture: ComponentFixture<SidebarTecnicoMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTecnicoMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTecnicoMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
