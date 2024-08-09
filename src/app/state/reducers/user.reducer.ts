import { Action, createReducer, on } from '@ngrx/store';
import {
  loadUser,
  loadUserFailure,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  loadUserSuccess,
} from '../actions/user.action';

enum UserStateProgress {
  loading = 'loading',
  idle = 'idle',
  succeeded = 'succeeded',
  failed = 'failed',
}

export interface UserState {
  users: any[];
  error: string | null;
  user: any | null;
  total_pages: number;
  status: 'loading' | 'idle' | 'succeeded' | 'failed';
}

export const initialState: UserState = {
  users: [],
  user: null,
  total_pages: 0,
  status: UserStateProgress.idle,
  error: null,
};

const _userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({
    ...state,
    status: UserStateProgress.loading,
    error: null,
  })),
  on(loadUsersSuccess, (state, { users, total_pages }) => ({
    ...state,
    users,
    status: UserStateProgress.succeeded,
    total_pages: total_pages,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    status: UserStateProgress.failed,
  })),

  on(loadUser, (state) => ({ ...state, status: UserStateProgress.loading })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    status: UserStateProgress.succeeded,
  })),
  on(loadUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: UserStateProgress.failed,
  }))
);

export function userReducer(state: UserState, action: Action) {
  return _userReducer(state, action);
}
