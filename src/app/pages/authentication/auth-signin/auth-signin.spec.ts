import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignin } from './auth-signin';

describe('AuthSignin', () => {
  let component: AuthSignin;
  let fixture: ComponentFixture<AuthSignin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthSignin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSignin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
