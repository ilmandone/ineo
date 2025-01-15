import {Component, inject, input} from '@angular/core';
import {Task} from '../../shared/commons';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TaskDialogComponent} from '../new-task-dialog/task-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DbService} from '../../shared/db.service';
import {StateService} from '../../shared/state.service';

@Component({
  selector: 'app-task',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  private readonly _dialog = inject(MatDialog);
  private readonly _db = inject(DbService)
  private readonly _state = inject(StateService)

  data = input.required<Task>()
  isSelected = input<boolean>(false)

  clickEdit(event$: MouseEvent) {
    event$.preventDefault();
    event$.stopPropagation()

    this._state.setCanDelete(null)

    const dialogRef = this._dialog.open(TaskDialogComponent, {
      data: this.data()
    })

    dialogRef.afterClosed().subscribe(r => {
      if (r) {
        const newTask: Task = {
          id: this.data().id,
          title: r.title,
          description: r.desc,
          state: this.data().state
        }

        this._db.updateTask(newTask).subscribe(() => {
          this._state.refreshTasks()
        })
      }

    })
  }
}
