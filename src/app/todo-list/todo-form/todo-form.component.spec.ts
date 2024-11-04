import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { AppModule } from 'src/app/app.module';
import { Router } from '@angular/router';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let store: MockStore;
  const routerSpy: Router = jasmine.createSpyObj('routerSpy', ['navigateByUrl']);

  beforeEach(() =>
    MockBuilder(TodoFormComponent, AppModule)
    .keep(ReactiveFormsModule)
    .provide(provideMockStore())
    .provide({ provide: Router, useValue: routerSpy })
  );

  beforeEach(() => {
    fixture = MockRender(TodoFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the Todo in the form in the state and go to edit on click Add', () => {
    // Given
    const inputElementTitle = ngMocks.find('input#title');
    const inputElementDescription = ngMocks.find('input#description');
    const formElement = ngMocks.find('form');

    ngMocks.change(inputElementTitle, 'aTitle');
    ngMocks.change(inputElementDescription, 'description 1');

    // When
    formElement.nativeElement.dispatchEvent(new Event('submit'));

    expect(store.dispatch).toHaveBeenCalled();
    expect(component.todoForm.value).toEqual({ id: null, title: null, description: null, isClosed: null, lastModificationDate: null });
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
  });

});
