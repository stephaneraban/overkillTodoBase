import { Todo } from '../models/todo';
import { createReducer, on } from '@ngrx/store';
import { loadOneTodo, loadOneTodoSuccess, loadTodosSuccess, updateTodoSuccess } from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
  todoDisplayed?: Todo;
  loading: boolean
}

export const initialState: State = {
  todos: [],
  loading: false
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
    const updatedTodos: Todo[] = state.todos.map(existingTodo => existingTodo.id === todo.id ? todo : existingTodo);
    return {
      ...state,
      todos: updatedTodos.sort(sortedTodo)
    }
  }),
  on(loadOneTodo, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(loadOneTodoSuccess, (state, { todo }) => {
    return {
      ...state,
      todoDisplayed: todo,
      loading: false
    }
  }),
);
