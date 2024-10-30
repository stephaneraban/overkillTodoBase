import {State} from './reducer';
import {selectTodoDisplayed, selectTodoLoading, selectTodos} from './selectors';

describe('Selectors', () => {
  const initialState: State = {
    todos: [
      { id: 1, title: 'todo1Title', isClosed: true, description: 'description 1', lastModificationDate: new Date() },
      { id: 2, title: 'todo2Title', isClosed: false, description: 'description 2', lastModificationDate: new Date() },
    ],
    loading: false
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select one todo', () => {
    const result = selectTodoDisplayed.projector(initialState);
    expect(result).toEqual(initialState.todoDisplayed);
  });

  it('should select loading status', () => {
    const result = selectTodoLoading.projector(initialState);
    expect(result).toEqual(initialState.loading);
  });
});
