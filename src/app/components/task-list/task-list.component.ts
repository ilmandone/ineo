import {Component, effect, inject, input, output} from '@angular/core';
import {Task} from 'src/app/shared/commons';
import {TaskComponent} from '../task/task.component';
import {StateService} from '../../shared/state.service';

@Component({
  selector: 'app-task-list',
  imports: [
    TaskComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  private _state = inject(StateService)

  title = input.required<string>()
  tasks = input<Task[]>()

  selectedID = output<string>()
  selectedId: string | null = null

  constructor() {
    effect(() => {
      this.selectedId = this._state.canDelete()
    });
  }

  clickTask(id: string) {
    this._state.setCanDelete(id)
  }
}
