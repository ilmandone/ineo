import { Component } from '@angular/core';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-loader',
  imports: [
    MatProgressBar
  ],
  template: `
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  `,
  styles: `
    :host {
      position: absolute;

      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255,255,255,0.8);

      display: flex;
      justify-content: center;
      align-items: center;

      mat-progress-bar {
        width: 80vw;
      }
    }
  `
})
export class LoaderComponent {

}
