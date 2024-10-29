import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { Store } from '@ngrx/store';
import { selectTodos } from '../store/selectors';
import { loadTodos, updateTodo, updateTodoSuccess } from '../store/actions';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<ReadonlyArray<Todo>>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectTodos);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  onClickCheckbox(todo: Todo, event: MatCheckboxChange): void {
    todo.isClosed = event.checked;
    this.store.dispatch(updateTodo({ todo: todo }));
    this.store.dispatch(loadTodos());
  }
}
