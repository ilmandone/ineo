import {Component, computed, inject, OnInit, signal} from '@angular/core';
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

  private _db = inject(DbService)
  private _state = inject(StateService)

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
    })
  }
}
