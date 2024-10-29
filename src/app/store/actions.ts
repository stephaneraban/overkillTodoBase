import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const loadTodos = createAction('[Todos] Load todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction('[Todos] Load todos failed');

export const updateTodo = createAction('[Todos] Update Todo',
  props<{ todo: Todo }>()
);

export const updateTodoSuccess = createAction('[Todos] Update Todo Success',
  props<{ todo: Todo }>()
);

export const updateTodoFailed = createAction('[Todos] Update Todo Failed');
