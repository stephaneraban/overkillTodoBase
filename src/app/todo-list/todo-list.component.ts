import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { Store } from '@ngrx/store';
import { selectTodos } from '../store/selectors';
import { loadTodos, updateTodo } from '../store/actions';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<ReadonlyArray<Todo>>;

  constructor(private store: Store, private router: Router) {
    this.todos$ = this.store.select(selectTodos);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  onClickCheckbox(todo: Todo, event: MatCheckboxChange): void {
    todo.isClosed = event.checked;
    this.store.dispatch(updateTodo({ todo: todo }));
  }

  onClickDetail(id: number): void {
    this.goToDetail(`detail/${id}`);
  }

  private goToDetail(url: string): void {
    this.router.navigateByUrl(url);
  }

  goToEdit(): void {
    this.router.navigateByUrl('edit');
  }

}
