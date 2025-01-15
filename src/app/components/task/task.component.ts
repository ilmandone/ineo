import {Component, ElementRef, HostListener, inject, input} from '@angular/core';
import {Task} from '../../shared/commons';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-task',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  data = input.required<Task>()
  isSelected = input<boolean>(false)
}
