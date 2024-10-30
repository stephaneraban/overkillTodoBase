import { Todo } from '../models/todo';
import { createReducer, on } from '@ngrx/store';
import { addTodo, addTodoSuccess, loadOneTodo, loadOneTodoSuccess, loadTodosSuccess, updateTodoSuccess } from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
  todoDisplayed?: Todo;
  loading: boolean,
}

export const initialState: State = {
  todos: [],
  loading: false
};

export const sortTodoByStatusAsc = (a: Todo, b: Todo) =>
  Number(a.isClosed) - Number(b.isClosed);

export const sortTodoByLastModificationDateDesc = (a: Todo, b: Todo) =>
  new Date(b.lastModificationDate).getTime() - new Date(a.lastModificationDate).getTime();

export const todosReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (state, { todos }) => {
    return {
      ...state,
      todos: [...todos].sort(sortTodoByLastModificationDateDesc).sort(sortTodoByStatusAsc),
    }
  }),
  on(updateTodoSuccess, (state, { todo } ) => {
    todo.lastModificationDate = new Date();
    const updatedTodos: Todo[] = state.todos.map(existingTodo => existingTodo.id === todo.id ? todo : existingTodo);
    return {
      ...state,
      todos: updatedTodos.sort(sortTodoByLastModificationDateDesc).sort(sortTodoByStatusAsc)
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
  on(addTodoSuccess, (state, { todo } ) => {
    return {
      ...state,
      todos: [ todo, ...state.todos ],
      lastModificationDate: new Date()
    }
  }),
);
