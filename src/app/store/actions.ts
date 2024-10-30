import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

// Load Todos
export const loadTodos = createAction('[Todos] Load todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction('[Todos] Load todos failed');

// load One Todo
export const loadOneTodo = createAction('[Todos] Load one todo',
  props<{ id: number }>()
);

export const loadOneTodoSuccess = createAction(
  '[Todos] Load one todo success',
  props<{ todo: Todo }>()
);

export const loadOneTodoFailed = createAction('[Todos] Load one todo failed');

// update Todo
export const updateTodo = createAction('[Todos] Update Todo',
  props<{ todo: Todo }>()
);

export const updateTodoSuccess = createAction('[Todos] Update Todo Success',
  props<{ todo: Todo }>()
);

export const updateTodoFailed = createAction('[Todos] Update Todo Failed');

// add Todo
export const addTodo = createAction('[Todos] Add Todo',
  props<{ todo: Todo }>()
);

export const addTodoSuccess = createAction('[Todos] Add Todo Success',
  props<{ todo: Todo }>()
);

export const addTodoFailed = createAction('[Todos] Add Todo Failed');