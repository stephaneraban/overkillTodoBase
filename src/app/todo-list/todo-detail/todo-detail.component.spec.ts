import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailComponent } from './todo-detail.component';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectTodoDisplayed, selectTodoLoading } from 'src/app/store/selectors';
import { Todo } from 'src/app/models/todo';
import { loadOneTodo } from 'src/app/store/actions';
import { DefaultRenderComponent, MockBuilder, MockRender } from 'ng-mocks';
import { AppModule } from 'src/app/app.module';

describe('TodoDetailComponent', () => {
  let fixture: ComponentFixture<TodoDetailComponent>;
  let component: DefaultRenderComponent<TodoDetailComponent>;
  let store: MockStore;
  const mockTodoDisplayed: Todo = { id: 1, title: 'todo 1', isClosed: false, description: 'description 1', lastModificationDate: new Date() };

  beforeEach(() =>
    MockBuilder(TodoDetailComponent, AppModule)
    .provide(provideMockStore({
      selectors: [
        {
          selector: selectTodoDisplayed,
          value: mockTodoDisplayed,
        },
        {
          selector: selectTodoLoading,
          value: false,
        },
      ],
    }))
    .provide({
      provide: ActivatedRoute,
      useValue: {
        snapshot: {
          params: {
                            id: 1,
          },
        },
      },
    })
  );

  beforeEach(() => {
    fixture = MockRender(TodoDetailComponent);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
    component = fixture.componentInstance;

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
    // Given / When
    component.ngOnInit();
    // Then
    expect(store.dispatch).toHaveBeenCalledWith(loadOneTodo({ id: mockTodoDisplayed.id }))
  });

});
