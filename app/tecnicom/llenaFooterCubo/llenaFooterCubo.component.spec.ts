import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlenaFooterCuboComponent } from './llenaFooterCubo.component';

describe('LlenaFooterCuboComponent', () => {
  let component: LlenaFooterCuboComponent;
  let fixture: ComponentFixture<LlenaFooterCuboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlenaFooterCuboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlenaFooterCuboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
