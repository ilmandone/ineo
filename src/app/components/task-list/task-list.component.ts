import {Component, input} from '@angular/core';
import { Task } from 'src/app/shared/commons';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  title = input.required<string>()
  tasks = input<Task[]>()
}
