import {Component, effect, ElementRef, HostListener, inject, input, output} from '@angular/core';
import { Task } from 'src/app/shared/commons';
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

  /*private _elRef = inject(ElementRef)

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: PointerEvent) {
    const targetElement = event.target as HTMLElement;
    if (!this._elRef.nativeElement.contains(targetElement)) {
      console.log('Click fuori dall\'elemento');
    }
  }*/

  title = input.required<string>()
  tasks = input<Task[]>()

  selectedID = output<string>()
  selectedId: string | null = null

  constructor() {
    effect(() => {
      this.selectedId = this._state.canDelete()
    });
  }

  clickTask(id: string, event$: MouseEvent) {
    this._state.setCanDelete(id)
  }
}
