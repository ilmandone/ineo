import {Injectable, signal} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _refreshTasks = new Subject<void>()
  private _canDelete = signal<string | null>(null)
  private _showLoader = signal<boolean>(false)

  get canDelete() {
    return this._canDelete.asReadonly()
  }

  setCanDelete(v: string | null) {
    this._canDelete.set(v)
  }

  get taskRefresh$() {
    return this._refreshTasks
  }

  refreshTasks() {
    this._refreshTasks.next()
  }

  get showLoader() {
    return this._showLoader.asReadonly()
  }

  setShowLoader(v: boolean) {
    this._showLoader.set(v)
  }
}
