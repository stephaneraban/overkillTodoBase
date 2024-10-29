import {State} from './reducer';
import {selectTodos} from './selectors';

describe('Selectors', () => {
  const initialState: State = {
   todos: [
     {id: 1, title: 'todo1Title', isClosed: true},
     {id: 2, title: 'todo2Title', isClosed: false},
   ]
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });
});
