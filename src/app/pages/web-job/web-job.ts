import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiUrlHelper } from 'src/app/theme/shared/helpers/api-url-helper';
import { CommonService } from 'src/app/theme/shared/service/common.service';
import { SpinnerService } from 'src/app/theme/shared/service/spinner.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-web-job',
  imports: [CommonModule, SharedModule],
  templateUrl: './web-job.html',
  styleUrl: './web-job.scss'
})
export class WebJob {

  statusMessage: string = '';
  statusClass: string = '';

  constructor(
    private readonly commonService: CommonService,
    private readonly api: ApiUrlHelper,
    private readonly spinner: SpinnerService
  ) { }

  triggerWebJob() {
    this.spinner.show();

    const url = this.api.apiUrl.web_job.trigger_web_job;

    this.commonService.doGet(url).subscribe({
      next: (response: any) => {
        this.spinner.hide();

        if (response.success) {
          this.statusClass = 'alert-success';
          this.statusMessage = response.message;
        }
        else {
          this.statusClass = 'alert-danger';
          this.statusMessage = response.message;
        }
      },
      error: () => {
        this.spinner.hide(); 
        this.statusMessage = 'An error occurred while triggering the Web Job.';
        this.statusClass = 'alert-danger';
      }
    });
  }
}
