import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiUrlHelper } from 'src/app/theme/shared/helpers/api-url-helper';
import { CommonService } from 'src/app/theme/shared/service/common.service';
import { SpinnerService } from 'src/app/theme/shared/service/spinner.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-blob-storage',
  imports: [CommonModule, SharedModule],
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


   // ---------------------------
  // Load Blob List
  // ---------------------------
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

  // ---------------------------
  // File Selection
  // ---------------------------
  onSelect(event: any) {
    this.selected = event.target.files[0];
  }

  // ---------------------------
  // Upload File
  // ---------------------------
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

  // ---------------------------
  // Get SAS URL
  // ---------------------------
  getUrl(name: string) {
    this.spinner.show();
    const url = this.api.apiUrl.blob_storage.url.replace('{name}',name);

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

  // ---------------------------
  // Download File
  // ---------------------------
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

  // ---------------------------
  // Delete Blob
  // ---------------------------
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