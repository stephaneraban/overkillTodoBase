import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { loadOneTodo } from 'src/app/store/actions';
import { selectTodoDisplayed, selectTodoLoading } from 'src/app/store/selectors';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  todo$!: Observable<Todo | undefined>;
  isLoading$: Observable<boolean> = of(false);

  constructor(private activatedRoute: ActivatedRoute, private store: Store) { 
    this.todo$ = this.store.select(selectTodoDisplayed);
    this.isLoading$ = this.store.select(selectTodoLoading);
  }

  ngOnInit(): void {
    const id: number = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(loadOneTodo({ id: id }));
   }

}
