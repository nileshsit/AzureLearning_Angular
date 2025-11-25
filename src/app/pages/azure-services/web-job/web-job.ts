import { Component } from '@angular/core';
import { ApiUrlHelper } from '../../../shared/helpers/api-url-helper';
import { CommonService } from '../../../shared/service/common.service';
import { SpinnerService } from '../../../shared/service/spinner.service';

@Component({
  selector: 'app-web-job',
  standalone:false,
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
