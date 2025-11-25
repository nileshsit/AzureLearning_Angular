import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './main';
import { Dashborad } from '../../pages/dashborad/dashborad';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../pages/azure-services/azure-services-module').then(
        (m) => m.AzureServicesModule
      ),
  },
  {
    path: 'dashboard',
    component:Dashborad
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
