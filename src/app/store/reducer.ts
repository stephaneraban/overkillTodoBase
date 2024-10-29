import { Todo } from '../models/todo';
import { createReducer, on } from '@ngrx/store';
import { loadTodosSuccess, updateTodoSuccess } from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
}

export const initialState: State = {
  todos: [],
};

// Sort Todo by status asc
export const sortedTodo = (a: Todo, b: Todo) =>
  Number(a.isClosed) - Number(b.isClosed);

export const todosReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: [...todos].sort(sortedTodo),
  })),
  on(updateTodoSuccess, (state, { todo } ) => {
    // console.log('todo: ', todo);
    const updatedTodos: Todo[] = state.todos.map(existingTodo => existingTodo.id === todo.id ? todo : existingTodo);
    return {
      ...state,
      todos: updatedTodos
    }
  }),
);
