import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlobStorage } from './blob-storage/blob-storage';
import { WebJob } from './web-job/web-job';

const routes: Routes = [
  {
    path:'blob-storage',
    component:BlobStorage
  },
  {
    path:'web-job',
    component:WebJob
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AzureServicesRoutingModule { }
