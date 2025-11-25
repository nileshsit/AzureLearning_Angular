import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthSignin } from './auth-signin/auth-signin';

const routes: Routes = [
  {
    path: '',
    component: AuthSignin
  },
  {
    path: 'sign-in',
    component: AuthSignin
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
