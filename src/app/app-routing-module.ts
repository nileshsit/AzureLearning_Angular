import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './layout/main/main';
import { Guest } from './layout/guest/guest';

const routes: Routes = [
  {
    path: '',
    component: Guest,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layout/guest/guest-module').then((m) => m.GuestModule)
      }
    ]
  },
  {
    path: '',
    component: Main,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layout/main/main-module').then((m) => m.MainModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
