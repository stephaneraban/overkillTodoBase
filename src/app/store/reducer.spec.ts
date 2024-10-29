import * as fromReducer from './reducer';
import { State } from './reducer';
import { loadTodosSuccess, updateTodoSuccess } from './actions';
import { Todo } from '../models/todo';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      // Given
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      // When
      const state = fromReducer.todosReducer(initialState, action);
      // Then
      expect(state).toBe(initialState);
    });
  });

  describe('loadTodosSuccess action', () => {
    it('should retrieve all todos and update the state', () => {
      // Given
      const { initialState } = fromReducer;
      const newState: State = { todos: [{ id: 1, title: 'aTitle', isClosed: false }] };
      const action = loadTodosSuccess({
        todos: [...newState.todos],
      });

      // When
      const state = fromReducer.todosReducer(initialState, action);

      // Then
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('updateTodosSuccess action', () => {

    it('should sort a todos list', () => {
      // Given
      const todos: Todo[] = [{ id: 1, title: 'aTitle1', isClosed: true },{ id: 2, title: 'aTitle2', isClosed: false }];
      const todosSorted: Todo[] = [{ id: 2, title: 'aTitle2', isClosed: false },{ id: 1, title: 'aTitle1', isClosed: true }];
      
      // When / Then
      expect(fromReducer.sortedTodo(todos[0], todos[1])).toEqual(1);
      expect(fromReducer.sortedTodo(todos[0], todos[0])).toEqual(0);
      expect(fromReducer.sortedTodo(todos[1], todos[0])).toEqual(-1);
    });



    it('should update a todo and update the state', () => {
      // Given
      const { initialState } = fromReducer;
      const previousState: State = { todos: [{ id: 1, title: 'aTitle', isClosed: false }] };
      const newState: State = { todos: [{ id: 1, title: 'aTitle2', isClosed: true }] };

      const actionLoad = loadTodosSuccess({
        todos: [...previousState.todos],
      });

      const stateLoad = fromReducer.todosReducer(initialState, actionLoad);

      // When
      const todoUpdated: Todo = { id: 1, title: 'aTitle2', isClosed: true };
      const actionUpdate = updateTodoSuccess({
        todo: todoUpdated,
      });

      const state = fromReducer.todosReducer(stateLoad, actionUpdate);

      // Then
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

});
