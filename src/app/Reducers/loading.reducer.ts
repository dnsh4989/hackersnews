import { createReducer, on } from '@ngrx/store';
import { changeStatus } from '../actions/loading.action';

const isLoading = false;

export const loadingReducer = createReducer<boolean>(
  isLoading,
  on(changeStatus, (state, action) => {
    return action.isLoading;
  })
);
