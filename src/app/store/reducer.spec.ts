import * as fromReducer from './reducer';
import { State } from './reducer';
import { addTodoSuccess, loadOneTodo, loadOneTodoSuccess, loadTodosSuccess, updateTodoSuccess } from './actions';
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
      const newState: State = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false, description: 'description 1', lastModificationDate: new Date() }],
        loading: false
      };
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

  describe('sorting', () => {
    it('should sort a todos list by last modification date desc', () => {
      // Given
      const todos: Todo[] = [{ id: 1, title: 'aTitle1', isClosed: true, description: 'description 1', lastModificationDate: new Date('2024-10-30T16:43:17.153Z') },{ id: 2, title: 'aTitle2', isClosed: false, description: 'description 1', lastModificationDate: new Date('2024-10-31T17:43:17.153Z') }];
      
      // When / Then
      expect(fromReducer.sortTodoByStatusAsc(todos[0], todos[1])).toEqual(1);
      expect(fromReducer.sortTodoByStatusAsc(todos[0], todos[0])).toEqual(0);
      expect(fromReducer.sortTodoByStatusAsc(todos[1], todos[0])).toEqual(-1);
    });

    it('should sort a todos list by status desc', () => {
      // Given
      const todos: Todo[] = [{ id: 1, title: 'aTitle1', isClosed: true, description: 'description 1', lastModificationDate: new Date('2024-10-30T16:43:17.153Z') },{ id: 2, title: 'aTitle2', isClosed: false, description: 'description 1', lastModificationDate: new Date('2024-10-31T17:43:17.153Z') }];
      
      // When / Then
      expect(fromReducer.sortTodoByLastModificationDateDesc(todos[0], todos[1])).toBeGreaterThan(1);
      expect(fromReducer.sortTodoByLastModificationDateDesc(todos[0], todos[0])).toEqual(0);
      expect(fromReducer.sortTodoByLastModificationDateDesc(todos[1], todos[0])).toBeLessThan(-1);
    });
  });

  describe('updateTodosSuccess action', () => {
    it('should update a todo and update the state', () => {
      // Given
      const { initialState } = fromReducer;
      const previousState: State = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false, description: 'description 1', lastModificationDate: new Date() }],
        loading: false
      };
      const newState: State = {
        todos: [{ id: 1, title: 'aTitle2', isClosed: true, description: 'description 2', lastModificationDate: new Date() }],
        loading: false
      };

      const actionLoad = loadTodosSuccess({
        todos: [...previousState.todos],
      });

      const stateLoad = fromReducer.todosReducer(initialState, actionLoad);

      // When
      const todoUpdated: Todo = { id: 1, title: 'aTitle2', isClosed: true, description: 'description 2', lastModificationDate: new Date() };
      const actionUpdate = updateTodoSuccess({
        todo: todoUpdated,
      });

      const state = fromReducer.todosReducer(stateLoad, actionUpdate);

      // Then
      expect(state.todos[0].id).toEqual(newState.todos[0].id);
      expect(state.todos[0].title).toEqual(newState.todos[0].title);
      expect(state.todos[0].isClosed).toEqual(newState.todos[0].isClosed);
      expect(state.todos[0].description).toEqual(newState.todos[0].description);
      expect(state).not.toBe(newState);
    });

    it('should update a todo with existing if id is not found and update the state', () => {
      // Given
      const { initialState } = fromReducer;
      const previousState: State = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false, description: 'description 1', lastModificationDate: new Date() }],
        loading: false
      };
      const newState: State = {
        todos: [{ id: 1, title: 'aTitle2', isClosed: true, description: 'description 2', lastModificationDate: new Date() }],
        loading: false
      };

      const actionLoad = loadTodosSuccess({
        todos: [...previousState.todos],
      });

      const stateLoad = fromReducer.todosReducer(initialState, actionLoad);

      // When
      const todoUpdated: Todo = { id: 10, title: 'aTitle2', isClosed: true, description: 'description 2', lastModificationDate: new Date() };
      const actionUpdate = updateTodoSuccess({
        todo: todoUpdated,
      });

      const state = fromReducer.todosReducer(stateLoad, actionUpdate);

      // Then
      expect(state.todos[0].id).toEqual(previousState.todos[0].id);
      expect(state.todos[0].title).toEqual(previousState.todos[0].title);
      expect(state.todos[0].isClosed).toEqual(previousState.todos[0].isClosed);
      expect(state.todos[0].description).toEqual(previousState.todos[0].description);
      expect(state).not.toBe(previousState);
    });
  });

  describe('loadOneTodoSuccess action', () => {
    it('should retrieve one todo to be displayed on loadOneTodo and update the state', () => {
      // Given
      const { initialState } = fromReducer;
      const previousState: State = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false, description: 'description 1', lastModificationDate: new Date() }],
        loading: false
      };
      const actionLoad = loadTodosSuccess({
        todos: [...previousState.todos],
      });
      const stateLoad = fromReducer.todosReducer(initialState, actionLoad);

      const newState: State = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false, description: 'description 1', lastModificationDate: new Date() }],
        loading: true
      };
      const action = loadOneTodo({
        id: newState.todoDisplayed?.id as number,
      });

      // When
      const state = fromReducer.todosReducer(stateLoad, action);

      // Then
      expect(state.todos[0].id).toEqual(newState.todos[0].id);
      expect(state.todos[0].title).toEqual(newState.todos[0].title);
      expect(state.todos[0].isClosed).toEqual(newState.todos[0].isClosed);
      expect(state.todos[0].description).toEqual(newState.todos[0].description);
      expect(state).not.toBe(newState);
    });

    it('should retrieve one todo to be displayed on loadOneTodoSuccess and update the state', () => {
      // Given
      const { initialState } = fromReducer;
      const previousState: State = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false, description: 'description 1', lastModificationDate: new Date() }],
        loading: false
      };
      const actionLoad = loadTodosSuccess({
        todos: [...previousState.todos],
      });
      const stateLoad = fromReducer.todosReducer(initialState, actionLoad);

      const newState: State = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false, description: 'description 1', lastModificationDate: new Date() }],
        todoDisplayed: { id: 1, title: 'aTitle', isClosed: false, description: 'description 1', lastModificationDate: new Date() },
        loading: false
      };
      const action = loadOneTodoSuccess({
        todo: newState.todoDisplayed as Todo,
      });

      // When
      const state = fromReducer.todosReducer(stateLoad, action);

      // Then
      expect(state.todos[0].id).toEqual(newState.todos[0].id);
      expect(state.todos[0].title).toEqual(newState.todos[0].title);
      expect(state.todos[0].isClosed).toEqual(newState.todos[0].isClosed);
      expect(state.todos[0].description).toEqual(newState.todos[0].description);
      expect(state).not.toBe(newState);
    });
  });

  describe('addTodosSuccess action', () => {
    it('should add a todo and update the state', () => {
      // Given
      const { initialState } = fromReducer;
      const newState: State = {
        todos: [{ id: null as unknown as number, title: 'aTitle', isClosed: true, description: 'description', lastModificationDate: new Date() }],
        loading: false
      };

      const action= addTodoSuccess({
        todo: newState.todos[0]
      });

      // When
      const state = fromReducer.todosReducer(initialState, action);

      // Then
      expect(state.todos[0].id).toEqual(newState.todos[0].id);
      expect(state.todos[0].title).toEqual(newState.todos[0].title);
      expect(state.todos[0].isClosed).toEqual(newState.todos[0].isClosed);
      expect(state.todos[0].description).toEqual(newState.todos[0].description);
      expect(state).not.toBe(newState);
    });
  });

});
