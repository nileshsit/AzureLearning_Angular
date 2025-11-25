import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing-module';
import { AuthSignin } from './auth-signin/auth-signin';
import { AuthSignup } from './auth-signup/auth-signup';
import { VerificationDilog } from './verification-dilog/verification-dilog';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    AuthSignin,
    AuthSignup,
    VerificationDilog
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
