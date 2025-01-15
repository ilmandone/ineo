import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Task} from 'src/app/shared/commons';

interface TaskFG {
  title: FormControl<string | null>,
  desc: FormControl<string | null>
}

@Component({
  selector: 'app-new-task-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<TaskDialogComponent>);
  readonly data = inject<Task>(MAT_DIALOG_DATA);

  taskFG: FormGroup<TaskFG> = new FormGroup<TaskFG>({
    desc: new FormControl<string>(this.data ? this.data.description : '', [Validators.required]),
    title: new FormControl<string>(this.data ? this.data.title : '', [Validators.required]),
  })

  clickCancel(): void {
    this.dialogRef.close();
  }
}
