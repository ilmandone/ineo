import {Component, inject, OnInit} from '@angular/core';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {StateService} from '../../shared/state.service';
import {MatDialog} from '@angular/material/dialog';
import {TaskDialogComponent} from '../new-task-dialog/task-dialog.component';
import {DbService} from '../../shared/db.service';
import {Task} from '../../shared/commons';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'header[ineo]',
  imports: [
    MatMiniFabButton,
    MatIcon,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  private readonly _dialog = inject(MatDialog);
  private readonly _db = inject(DbService)

  readonly state = inject(StateService)

  selected = new FormControl('valid');
  options = [
    {value: 'title', viewValue: 'Title'},
    {value: 'description', viewValue: 'Description'},
  ];

  ngOnInit() {
    this.selected.valueChanges.subscribe(r => {
      this.state.setShowLoader(true)
      this._db.loadTasks(r ?? undefined).subscribe(() => {
        this.state.setShowLoader(false)
        this.state.refreshTasks()
      })
    })
  }

  newTaskDialog() {
    const dialogRef = this._dialog.open(TaskDialogComponent)

    dialogRef.afterClosed().subscribe(r => {
      const newTask: Task = {
        id: "",
        title: r.title,
        description: r.desc,
        state: 'TODO'
      }

      this._db.createTask(newTask).subscribe(() => {
        this.state.refreshTasks()
      })
    })
  }

  deleteTask() {
    const id = this.state.canDelete()
    if (id)
      this._db.deleteTask(id).subscribe(() => {
        this.state.setCanDelete(null)
        this.state.refreshTasks()
      })
  }
}
