import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebJob } from './web-job';

describe('WebJob', () => {
  let component: WebJob;
  let fixture: ComponentFixture<WebJob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebJob]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebJob);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
