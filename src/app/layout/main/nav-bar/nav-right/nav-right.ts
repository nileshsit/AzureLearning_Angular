import { Component, inject } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-right',
  standalone: false,
  templateUrl: './nav-right.html',
  styleUrl: './nav-right.scss',
})
export class NavRight {
 // public props

  // constructor
  constructor() {
    const config = inject(NgbDropdownConfig);

    config.placement = 'bottom-right';
  }
}
