import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { first } from 'rxjs/operators';
import { Todo } from '../models/todo';
import { environment } from '../../environments/environment';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list todos', (done: DoneFn) => {
<<<<<<< HEAD
    const mockedTodoList: Todo[] = [{ id: 1, title: 'todoTitle', isClosed: true, description: 'description 1' }];
=======
    const mockedTodoList: Todo[] = [{ id: 1, title: 'todoTitle', isClosed: true }];
>>>>>>> bef0cae (feat[2]- TUs)

    service
      .list()
      .pipe(first())
      .subscribe((res: Todo[]) => {
        expect(res).toEqual(mockedTodoList);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockedTodoList);
  });

  it('should update todo', (done: DoneFn) => {
    const mockedTodoUpdated: Todo = { id: 1, title: 'todoTitle', isClosed: false, description: 'description 1' };

    service
      .updateTodo(mockedTodoUpdated)
      .pipe(first())
      .subscribe((res: Todo) => {
        expect(res).toEqual(mockedTodoUpdated);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos/${mockedTodoUpdated.id}`
    );
    expect(req.request.method).toEqual('PUT');

    req.flush(mockedTodoUpdated);
  });

});
