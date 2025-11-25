import { Component, output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
 // public props
 readonly NavCollapsedMob = output();
 navCollapsedMob;
 headerStyle: string;
 menuClass: boolean;
 collapseStyle: string;

 // constructor
 constructor() {
   this.navCollapsedMob = false;
   this.headerStyle = '';
   this.menuClass = false;
   this.collapseStyle = 'none';
 }

 // public method
 toggleMobOption() {
   this.menuClass = !this.menuClass;
   this.headerStyle = this.menuClass ? 'none' : '';
   this.collapseStyle = this.menuClass ? 'block' : 'none';
 }

 // this is for eslint rule
 handleKeyDown(event: KeyboardEvent): void {
   if (event.key === 'Escape') {
     this.closeMenu();
   }
 }

 closeMenu() {
   if (document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
     document.querySelector('app-navigation.pcoded-navbar').classList.remove('mob-open');
   }
 }
}
