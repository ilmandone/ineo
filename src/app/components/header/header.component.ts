import {Component, inject} from '@angular/core';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {StateService} from '../../shared/state.service';
import {MatDialog} from '@angular/material/dialog';
import {NewTaskDialogComponent} from '../new-task-dialog/new-task-dialog.component';
import {DbService} from '../../shared/db.service';
import {Task} from '../../shared/commons';

@Component({
  selector: 'header[ineo]',
  imports: [
    MatMiniFabButton,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly _dialog = inject(MatDialog);
  private readonly _dbSrv = inject(DbService)

  readonly state = inject(StateService)

  newTaskDialog() {
    const dialogRef = this._dialog.open(NewTaskDialogComponent)

    dialogRef.afterClosed().subscribe(r => {
      const newTask: Task = {
        id: -1,
        title: r.title,
        description: r.desc,
        state: 'TODO'
      }

      this._dbSrv.createTask(newTask).subscribe(() => {
        this.state.refreshTasks()
      })
    })
  }
}
