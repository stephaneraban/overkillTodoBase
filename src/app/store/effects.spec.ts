import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Effects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { todosReducer } from './reducer';
import { TodoService } from '../services/todo.service';
import { cold, hot } from 'jasmine-marbles';
import {loadTodos, loadTodosFailed, loadTodosSuccess, updateTodo, updateTodoFailed, updateTodoSuccess} from './actions';
import { Todo } from '../models/todo';

describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', ['list','updateTodo']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ todosStore: todosReducer })],
      providers: [
        Effects,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useValue: todoService,
        },
      ],
    });

    effects = TestBed.inject(Effects);
  });

  describe('loadTodos$', () => {
    it('should dispatch loadTodosSuccess action when todoService.list return a result', () => {
      const mockedTodos: Todo[] = [{ id: 1, title: 'aTitle', isClosed: true }];
      todoService.list.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosSuccess({ todos: mockedTodos }),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailed action when todoService.list fails', () => {
      todoService.list.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosFailed(),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });

  describe('updateTodo$', () => {
    it('should dispatch updateTodoSuccess action when todoService.updateTodo return a result', () => {
      // const mockedTodos: Todo[] = [{ id: 1, title: 'aTitle', isClosed: true }];
      const mockedTodo: Todo = { id: 1, title: 'aTitle', isClosed: true };
      todoService.updateTodo.and.returnValue(of(mockedTodo));

      actions = hot('-a-', {
        a: updateTodo({ todo: mockedTodo }),
      });
      const expected = cold('-b-', {
        b: updateTodoSuccess({ todo: mockedTodo }),
      });

      expect(effects.updateTodos$).toBeObservable(expected);
    });

    // it('should dispatch updateTodoFailed action when todoService.updateTodo fails', () => {
    //   const mockedTodo: Todo = { id: 1, title: 'aTitle', isClosed: true };
    //   todoService.updateTodo.and.returnValue(cold('#'));

    //   actions = hot('-a-', {
    //     a: updateTodo({ todo: mockedTodo }),
    //   });
    //   const expected = cold('-b-', {
    //     b: updateTodoFailed(),
    //   });

    //   expect(effects.updateTodos$).not.toBeObservable(expected);
    // });
  });

});
