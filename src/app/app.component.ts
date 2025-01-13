import {Component, computed, inject, Injector, OnInit, Signal} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {HttpClient} from '@angular/common/http';
import {Task} from './shared/commons';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private _httpClient = inject(HttpClient)
  private _injector = inject(Injector)

  data!: Signal<Task[] | undefined>

  taskDone = computed(() => {
    return this.data()?.filter(d => d.state === "DONE")
  })

  taskInProgress = computed(() => {
    return this.data()?.filter(d => d.state === "IN PROGRESS")
  })
  taskToDo = computed(() => {
    return this.data()?.filter(d => d.state === "TODO")
  })

  ngOnInit() {
    this.data = toSignal(
      this._httpClient.get<Task[]>('http://localhost:3000/tasks'),
      {
        injector: this._injector
      })
  }

}
