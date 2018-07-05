import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdministrativoComponent } from './sidebarAdministrativo.component';

describe('SidebarAdministrativoComponent', () => {
  let component: SidebarAdministrativoComponent;
  let fixture: ComponentFixture<SidebarAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
