import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  createDb(): {} {
    const todos: Todo[] = [
      { id: 1, title: 'todo in memory 1', isClosed: false, description: 'description 1' },
      { id: 2, title: 'todo in memory 2', isClosed: false, description: 'description 2' },
      { id: 3, title: 'todo in memory 3', isClosed: true, description: 'description 3' },
      { id: 4, title: 'todo in memory 4', isClosed: false, description: 'description 4' },
    ];
    return { todos };
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
}

}
