import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Todo} from '../models/todo';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.baseUrl}/api/todos`).pipe(
    );
  }

  getbyId(id: number): Observable<Todo> {
    const url = `${environment.baseUrl}/api/todos/${id}`;
    return this.http.get<Todo>(url);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${environment.baseUrl}/api/todos/${todo.id}`;
    return this.http.put<Todo>(url, todo).pipe(
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    // Définir l'Id null en tant que number
    const body: Todo = { ...todo, id: null as unknown as number };
    return this.http.post<Todo>(`${environment.baseUrl}/api/todos`, body);
  }
}
