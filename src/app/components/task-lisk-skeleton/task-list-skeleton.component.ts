import {Component, input} from '@angular/core';

@Component({
  selector: 'app-task-lisk-skeleton',
  imports: [],
  templateUrl: './task-list-skeleton.component.html',
  styleUrl: './task-list-skeleton.component.scss'
})
export class TaskListSkeletonComponent {
  title = input.required<string>()
  width = input<string>('100%');
  height = input<string>('140px');
  rounded = input<boolean>(true);

  protected randomArray = Array(Math.floor(Math.random() * 3) + 2);
}
