import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTodos, loadTodosFailed, loadTodosSuccess, updateTodo, updateTodoFailed, updateTodoSuccess } from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import { of } from 'rxjs';

@Injectable()
export class Effects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.list().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError(() => [loadTodosFailed()])
        )
      )
    )
  );

  updateTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      mergeMap(({ todo }) =>
        this.todoService.updateTodo(todo).pipe(
          // map((todo: Todo) => updateTodoSuccess({ todo })), // A utiliser dans le cas réel, pas in memory db api
          map(() => updateTodoSuccess({ todo })), // in memory db api si l'objet retourné est null
          catchError((error) => [updateTodoFailed])
          )
        )
      )
    );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
