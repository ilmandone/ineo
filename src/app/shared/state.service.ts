import {Injectable, signal} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _refreshTasks = new Subject<void>()
  private _canDelete = signal<string | null>(null)

  get canDelete() {
    return this._canDelete.asReadonly()
  }

  setCanDelete(v: string) {
    this._canDelete.set(v)
  }

  get taskRefresh$() {
    return this._refreshTasks
  }

  refreshTasks() {
    this._refreshTasks.next()
  }
}
