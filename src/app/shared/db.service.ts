import {inject, Injectable} from '@angular/core';
import {catchError, delay, Observable, tap} from 'rxjs';
import {Task} from './commons';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly API_URL = 'http://localhost:3000/tasks'
  private _httpClient = inject(HttpClient)
  private _data!: Task[]

  loadTasks(sort?:string): Observable<Task[]> {
    return this._httpClient.get<Task[]>(`${this.API_URL}${sort ? `?_sort=title` : ''}`)
      .pipe(
        delay(1500),
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
      id: (this._data.length + 1).toString()
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

  deleteTask(id: string): Observable<Task> {
    return this._httpClient.delete<Task>(`${this.API_URL}/${id}`).pipe(
      catchError(err => {
        throw new Error(err)
      }),
      tap(r => {
        const tIndex = this._data.findIndex(t => t.id === r.id)
        this._data.splice(tIndex, 1)
      })
    )
  }

  updateTask(task: Task): Observable<Task> {
    return this._httpClient.put<Task>(`${this.API_URL}/${task.id}`, task).pipe(
      catchError(err => {
        throw new Error(err)
      }),
      tap(r => {
        const tIndex = this._data.findIndex(t => t.id === r.id)
        this._data.splice(tIndex, 1, task)
      })
    )
  }
}
