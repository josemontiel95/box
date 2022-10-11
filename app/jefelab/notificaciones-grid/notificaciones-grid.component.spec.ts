import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesGridComponent } from './notificaciones-grid.component';

describe('NotificacionesGridComponent', () => {
  let component: NotificacionesGridComponent;
  let fixture: ComponentFixture<NotificacionesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
