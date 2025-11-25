import { Component, output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
 // public props
 NavCollapse = output();
 NavCollapsedMob = output();
 navCollapsed: boolean;
 navCollapsedMob: boolean;
 windowWidth: number;

 // constructor
 constructor() {
   this.windowWidth = window.innerWidth;
   this.navCollapsedMob = false;
 }

 // public method
 navCollapse() {
   if (this.windowWidth >= 992) {
     this.navCollapsed = !this.navCollapsed;
     this.NavCollapse.emit();
   }
 }

 navCollapseMob() {
   if (this.windowWidth < 992) {
     this.NavCollapsedMob.emit();
   }
 }
}
