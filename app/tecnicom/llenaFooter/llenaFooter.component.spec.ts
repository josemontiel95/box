import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlenaFooterComponent } from './llenaFooter.component';

describe('LlenaFooterComponent', () => {
  let component: LlenaFooterComponent;
  let fixture: ComponentFixture<LlenaFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlenaFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlenaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
