import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ApiUrlHelper {
  public apiUrl = {
    account:{
      login:"account/login",
      verify_otp:"account/verify-otp"
    },
    blob_storage: {
      list: 'blob/list',
      upload: 'blob/upload',
      download: 'blob/download/{name}',
      delete: 'blob/{name}',
      url: 'blob/sas-url/{name}/{expiryMinutes}',
    },
    web_job: {
      trigger_web_job: 'webJob/trigger'
    }
  };
}