import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  QueryList,
  signal, ViewChild,
  ViewChildren
} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {Task} from './shared/commons';
import {DbService} from './shared/db.service';
import {StateService} from './shared/state.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  @ViewChild('headerEl', {read: ElementRef}) headerEl!: ElementRef<HTMLElement>
  @ViewChildren(TaskListComponent, {read: ElementRef}) taskLists!: QueryList<ElementRef<HTMLElement>>

  private _db = inject(DbService)
  private _state = inject(StateService)

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: PointerEvent) {
    const targetElement = event.target as HTMLElement;
    const d = this.taskLists.toArray().concat(this.headerEl)
    let count = 0

    for (let i = 0; i < d.length; i++) {
      if (!d[i].nativeElement.contains(targetElement)) {
        count ++
      }
    }

    // Consider only the 3 task list component and the header controls
    if (count === 4) this._state.setCanDelete(null)
  }

  data = signal<Task[] | undefined>(undefined)

  taskDone = computed(() => {
    return this.data()?.filter(d => d.state === "DONE")
  })

  taskInProgress = computed(() => {
    return this.data()?.filter(d => d.state === "IN PROGRESS")
  })
  taskToDo = computed(() => {
    return this.data()?.filter(d => d.state === "TODO")
  })

  private _loadData() {
    this._db.loadTasks().subscribe(r => {
      this.data.set(r)
    })
  }

  ngOnInit() {
    this._loadData()

    this._state.taskRefresh$.subscribe(() => {
      this.data.set([...this._db.getTask()])
      this._state.setCanDelete(null)
    })
  }
}
