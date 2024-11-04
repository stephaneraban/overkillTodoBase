import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../store/reducer';
import { selectTodos } from '../store/selectors';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MockBuilder, MockComponents, MockDirectives, MockedComponent, MockRender, ngMocks } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { Todo } from '../models/todo';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import {  updateTodo } from '../store/actions';
import { AppModule } from '../app.module';
import * as reducer from '../store/reducer'


describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;
  let store: MockStore;
  // let mockTodosSelector;
  const routerSpy: Router = jasmine.createSpyObj('routerSpy', ['navigateByUrl']);
  const mockTodos: Todo[] = [ { id: 1, title: 'todo 1', isClosed: false, description: 'description 1', lastModificationDate: new Date() },
                              { id: 2, title: 'todo 2', isClosed: true, description: 'description 2', lastModificationDate: new Date() } 
                            ];

  beforeEach( () =>
    MockBuilder(TodoListComponent, AppModule)
    .provide(MockComponents(
            MatCheckbox,
            MatListItem,
            MatList,
            MatCard
          ))
    .provide(MockDirectives(
            MatCardContent,
            MatCardTitle
          ))
    .provide(provideMockStore<State>({
      initialState: reducer.initialState,
      selectors: [
        {
          selector: selectTodos,
          value: mockTodos,
        }
      ],
    }))  
    .provide(provideRouter([]))
    .provide({
      provide: ActivatedRoute,
      useValue: {
        snapshot: {
          paramMap: {
            get: (key: string) => {
              switch (key) {
                case 'id':
                  return '1';
                default:
                  return '';
              }
            },
          },
        },
      },
    })
    .provide({ provide: Router, useValue: routerSpy })
  );

  beforeEach(() => {
    fixture = MockRender(TodoListComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;

    spyOn(store, 'dispatch').and.callThrough();

  });

  afterEach(()=> {
      ngMocks.flushTestBed();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {

    expect(ngMocks.find('mat-card-title').nativeElement.innerText).toContain(
      'Todos'
    );

    expect(ngMocks.find('mat-card-title').nativeElement.innerText).toContain(
      'Add'
    );
  });

  it('should display todos', () => {
    // Given / When
    const todoElements = ngMocks.findAll('mat-list mat-list-item');
    
    // Then
    expect(todoElements.length).toEqual(2);

    expect(todoElements[0].properties.innerText).toContain('todo 1');
    expect(todoElements[1].properties.innerText).toContain('todo 2');

    const todoCheckboxes: MockedComponent<MatCheckbox>[] =
      todoElements.map(item => item.query(By.css('mat-checkbox'))).map(item => item.componentInstance);
    expect(todoCheckboxes[0].checked).toBeFalse();
    expect(todoCheckboxes[1].checked).toBeTrue();
  });

  it('should display updated todos on update', () => {
    // Given
    const mockTodoUpdated: Todo = {
      id: 1, title: 'todo 3', isClosed: false,
      description: 'description',
      lastModificationDate: new Date()
    };

    const event: MatCheckboxChange = {
      checked: true,
      source: null as unknown as MatCheckbox
    };

    // When
    component.onClickCheckbox(mockTodoUpdated, event);

    // Then
    expect(store.dispatch).toHaveBeenCalledWith(updateTodo({ todo: mockTodoUpdated })
    );
  });

  it('should go to detail on click Detail', () => {

    // Given
    const buttonDetail = ngMocks.find('.button-detail');

    // When
    ngMocks.click(buttonDetail);

    // Then
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
  });

  it('should go to edit on click Add', () => {

    // Given
    const buttonDetail = ngMocks.find('.button-add');

    // Given / When
    ngMocks.click(buttonDetail);

    // Then
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
  });

});
