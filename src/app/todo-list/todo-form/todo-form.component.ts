import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addTodo } from 'src/app/store/actions';
import { State } from 'src/app/store/reducer';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<State>, private router: Router) { 
    this.todoForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      isClosed: [false],
      description: [''],
      lastModificationDate: [new  Date()]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.todoForm.valid) {
      this.store.dispatch(addTodo({ todo: this.todoForm.value }));
      this.todoForm.reset();
      this.goToList();
    }
  }

  private goToList(): void {
    this.router.navigateByUrl('');
  }

}
