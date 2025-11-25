import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Guest } from './guest';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../pages/authentication/authentication-module').then(
        (m) => m.AuthenticationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
