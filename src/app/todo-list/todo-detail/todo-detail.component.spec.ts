import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailComponent } from './todo-detail.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/store/reducer';
import { selectTodoDisplayed, selectTodoLoading } from 'src/app/store/selectors';
import { Todo } from 'src/app/models/todo';
import { loadOneTodo } from 'src/app/store/actions';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;
  let store: MockStore<State>;
  let mockTodosSelector;
  const mockTodoDisplayed: Todo = { id: 1, title: 'todo 1', isClosed: false, description: 'description 1', lastModificationDate: new Date() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoDetailComponent ],
      providers: [provideRouter([]),provideMockStore(),{
        provide: ActivatedRoute,
         useValue: {
          snapshot: {
            params: {
                  id: 1,
            },
        },
        },
       },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodoDisplayed,mockTodoDisplayed);
    mockTodosSelector = store.overrideSelector(selectTodoLoading, false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the todo to display and the status from the store', () => {
    component.todo$.subscribe(todo => expect(todo).toEqual(mockTodoDisplayed));
    component.isLoading$.subscribe(isLoading => expect(isLoading).toEqual(false));
  });

  it('should update the store with the todo to display on init', () => {
    // Given
    const dispatchSpy = spyOn(store, 'dispatch');
    // When
    component.ngOnInit();
    // Then
    expect(dispatchSpy).toHaveBeenCalledWith(loadOneTodo({ id: mockTodoDisplayed.id }))
  });

});
