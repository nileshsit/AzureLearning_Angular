import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationDilog } from './verification-dilog';

describe('VerificationDilog', () => {
  let component: VerificationDilog;
  let fixture: ComponentFixture<VerificationDilog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificationDilog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificationDilog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
