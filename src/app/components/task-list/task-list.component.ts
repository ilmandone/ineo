import {Component, input} from '@angular/core';
import { Task } from 'src/app/shared/commons';
import {TaskComponent} from '../task/task.component';

@Component({
  selector: 'app-task-list',
  imports: [
    TaskComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  title = input.required<string>()
  tasks = input<Task[]>()
}
