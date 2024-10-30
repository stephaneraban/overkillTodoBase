import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey, State} from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => state.todos,
);

export const selectTodoDiplayed = createSelector(
  getState,
  (state: State) => state.todoDisplayed,
);

export const selectTodoLoading = createSelector(
  getState,
  (state: State) => state.loading,
);
