import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { State } from 'src/app/store/reducer';
import { addTodo } from 'src/app/store/actions';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let store: MockStore<State>;
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
    store = TestBed.inject(MockStore);
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
    const mockedTodo: Todo = { id: null as unknown as number, title: 'aTitle', isClosed: true, description: 'description 1', lastModificationDate: new Date() };
    const dispatchSpy = spyOn(store, 'dispatch');

    component.todoForm.patchValue(mockedTodo);

    // Given / When
    component.onSubmit();

    // Then
    expect(dispatchSpy).toHaveBeenCalledWith(addTodo({ todo: { title: 'aTitle', description: 'description 1' } as Todo })
    );
    expect(component.todoForm.value).toEqual({ title: null, description: null });
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
  });


});
