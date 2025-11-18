import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ApiUrlHelper {
  public apiUrl = {
    blob_storage: {
      list: 'blob/list',
      upload: 'blob/upload',
      download: 'blob/download/{name}',
      delete: 'blob/{name}',
      url: 'blob/sas-url/{name}/{expiryMinutes}',
    }
  };
}