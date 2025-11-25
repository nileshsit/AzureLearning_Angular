import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-nav-logo',
  standalone: false,
  templateUrl: './nav-logo.html',
  styleUrl: './nav-logo.scss',
})
export class NavLogo {
 // public props
 @Input() navCollapsed: boolean;
 NavCollapse = output();
 windowWidth = window.innerWidth;

 // public method
 navCollapse() {
   if (this.windowWidth >= 992) {
     this.navCollapsed = !this.navCollapsed;
     this.NavCollapse.emit();
   }
 }
}
