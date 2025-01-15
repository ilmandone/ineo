import {inject, Injectable} from '@angular/core';
import {catchError, Observable, tap} from 'rxjs';
import {Task} from './commons';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly API_URL = 'http://localhost:3000/tasks'
  private _httpClient = inject(HttpClient)
  private _data!: Task[]

  loadTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(this.API_URL)
      .pipe(
        tap(r => {
          this._data = r
        }))
  }

  getTask(): Task[] {
    return this._data
  }

  createTask(v: Omit<Task, 'id'>): Observable<Task> {
    const data = {
      ...v,
      id: this._data.length + 1
    }
    return this._httpClient.post<Task>(`${this.API_URL}`, data)
      .pipe(
        catchError(err => {
          throw new Error(err)
        }),
        tap(r => {
          this._data = this._data.concat(r)
        })
      )
  }

  deleteTask(id: number): Observable<Task> {
    return this._httpClient.delete<Task>(`${this.API_URL}/${id}`)
  }
}
