import { Component } from '@angular/core';
import screenfull from 'screenfull';

@Component({
  selector: 'app-nav-left',
  standalone: false,
  templateUrl: './nav-left.html',
  styleUrl: './nav-left.scss',
})
export class NavLeft {
  screenFull = true;

  // life cycle hook
  ngOnInit() {
    if (screenfull.isEnabled) {
      this.screenFull = screenfull.isFullscreen; // Initialize based on current fullscreen state
      screenfull.on('change', () => {
        this.screenFull = screenfull.isFullscreen;
      });
    }
  }

  ngOnDestroy() {
    if (screenfull.isEnabled) {
      screenfull.off('change', () => {
        this.screenFull = screenfull.isFullscreen;
      });
    }
  }

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle().then(() => {
        this.screenFull = screenfull.isFullscreen;
      });
    }
  }
}
