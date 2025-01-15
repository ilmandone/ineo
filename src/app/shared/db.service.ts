import {inject, Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {Task} from './commons';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly API_URL = 'http://localhost:3000/tasks'
  private _httpClient = inject(HttpClient)
  private _dataLength!: number

  loadTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(this.API_URL).pipe(tap(r => {
      this._dataLength = r.length
    }))
  }

  createTask(v: Omit<Task,'id'>): Observable<Task> {
    const data = {
      ...v,
      id: this._dataLength + 1
    }
    return this._httpClient.post<Task>(`${this.API_URL}`, data)
  }

  deleteTask(id: number): Observable<Task> {
    return this._httpClient.delete<Task>(`${this.API_URL}/${id}`)
  }
}
