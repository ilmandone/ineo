import {Component, inject, model} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

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
  templateUrl: './new-task-dialog.component.html',
  styleUrl: './new-task-dialog.component.scss'
})
export class NewTaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewTaskDialogComponent>);

  taskFG: FormGroup<TaskFG> = new FormGroup<TaskFG>({
    desc: new FormControl<string>('', [Validators.required]),
    title: new FormControl<string>('', [Validators.required]),
  })

  clickCancel(): void {
    this.dialogRef.close();
  }
}
