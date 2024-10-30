import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  const routerSpy: Router = jasmine.createSpyObj('routerSpy', ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ TodoFormComponent ],
      providers: [provideMockStore(), { provide: Router, useValue: routerSpy }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([FormBuilder], (fb: FormBuilder) => {
    // fixture = TestBed.createComponent(TodoFormComponent);
    // component = fixture.componentInstance;

    /* This is where we can simulate / test our component
       and pass in a value for formGroup where it would've otherwise
       required it from the parent
    */
    component.todoForm = fb.group({
      title:  ['Title', Validators.required],
      description: ['']
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the Todo in the form in the state and go to edit on click Add', () => {

    const mockedTodo: Todo = { id: 1, title: 'aTitle', isClosed: true, description: 'description 1', lastModificationDate: new Date() };

    component.todoForm.patchValue(mockedTodo);

    // Given / When
    component.onSubmit();

    // Then
    expect(component.todoForm.value).toEqual({ title: null, description: null });
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
  });


});
