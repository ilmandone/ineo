import {Injectable, signal} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _refreshTasks = new Subject<void>()
  private _canDelete = signal<boolean>(false)

  get canDelete() {
    return this._canDelete.asReadonly()
  }

  setCanDelete(v: boolean) {
    this._canDelete.set(v)
  }

  get taskRefresh$() {
    return this._refreshTasks
  }

  refreshTasks() {
    this._refreshTasks.next()
  }
}
