import { Component } from '@angular/core';
import { ApiUrlHelper } from '../../../shared/helpers/api-url-helper';
import { CommonService } from '../../../shared/service/common.service';
import { SpinnerService } from '../../../shared/service/spinner.service';

@Component({
  selector: 'app-blob-storage',
  standalone:false,
  templateUrl: './blob-storage.html',
  styleUrl: './blob-storage.scss'
})
export class BlobStorage {
  files: string[] = [];
  selected?: File;
  sasUrl: string | null = null;

  constructor(
    private readonly commonService: CommonService,
    private readonly api: ApiUrlHelper,
    private readonly spinner: SpinnerService
  ) { }

  ngOnInit() { this.load(); }

  load() {
    this.spinner.show();

    const url = this.api.apiUrl.blob_storage.list;

    this.commonService.doGet(url).subscribe({
      next: (response: any) => {
        this.spinner.hide();

        if (response.success) {
          this.files = response.data ?? [];
        }
      },
      error: () => this.spinner.hide()
    });
  }

  onSelect(event: any) {
    this.selected = event.target.files[0];
  }

  upload() {
    if (!this.selected) return;

    this.spinner.show();

    const url = this.api.apiUrl.blob_storage.upload;
    const formData = new FormData();
    formData.append('file', this.selected);

    this.commonService.doPost(url, formData).subscribe({
      next: (res: any) => {
        this.spinner.hide();

        if (res.success) {
          this.load();
          this.selected = undefined;
        }
      },
      error: () => this.spinner.hide()
    });
  }

  getUrl(name: string) {
    this.spinner.show();
    const url = this.api.apiUrl.blob_storage.url.replace('{name}',name).replace('{expiryMinutes}','10');

    this.commonService.doGet(url).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        if (res.success) {
          this.sasUrl = res.data;
        }
      },
      error: () => this.spinner.hide()
    });
  }

  download(name: string) {
    const url = this.api.apiUrl.blob_storage.download.replace('{name}',name);

    this.spinner.show();

    this.commonService.doGetBlob(url).subscribe({
      next: (blob: Blob) => {
        this.spinner.hide();

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
      },
      error: () => this.spinner.hide()
    });
  }

  delete(name: string) {
    const url = this.api.apiUrl.blob_storage.delete.replace('{name}',name);
    this.spinner.show();

    this.commonService.doDelete(url).subscribe({
      next: (res: any) => {
        this.spinner.hide();

        if (res.success) {
          this.load();
        }
      },
      error: () => this.spinner.hide()
    });
  }

}