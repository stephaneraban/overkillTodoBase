import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  createDb(): {} {
    const todos: Todo[] = [
      { id: 1, title: 'todo in memory 1', isClosed: false, description: 'description 1', lastModificationDate: new Date('2024-10-30T16:43:17.153Z') },
      { id: 2, title: 'todo in memory 2', isClosed: false, description: 'description 2', lastModificationDate: new Date('2024-10-30T16:44:17.153Z') },
      { id: 3, title: 'todo in memory 3', isClosed: true, description: 'description 3', lastModificationDate: new Date('2024-10-30T16:45:17.153Z') },
      { id: 4, title: 'todo in memory 4', isClosed: false, description: 'description 4', lastModificationDate: new Date('2024-10-30T16:46:17.153Z') },
    ];
    return { todos };
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
}

}
