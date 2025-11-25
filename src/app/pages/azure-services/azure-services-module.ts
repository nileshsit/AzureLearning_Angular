import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AzureServicesRoutingModule } from './azure-services-routing-module';
import { BlobStorage } from './blob-storage/blob-storage';
import { WebJob } from './web-job/web-job';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    BlobStorage,
    WebJob
  ],
  imports: [
    CommonModule,
    SharedModule,
    AzureServicesRoutingModule
  ]
})
export class AzureServicesModule { }
