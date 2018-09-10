import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlenaFooterVigaComponent } from './llenaFooterViga.component';

describe('LlenaFooterVigaComponent', () => {
  let component: LlenaFooterVigaComponent;
  let fixture: ComponentFixture<LlenaFooterVigaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlenaFooterVigaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlenaFooterVigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
