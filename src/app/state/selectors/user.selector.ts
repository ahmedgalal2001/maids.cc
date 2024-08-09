import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from '../reducers/user.reducer';

const selectUser = (state: AppState): UserState => state.user;

export const selectUsers = createSelector(
  selectUser,
  (state: UserState) => state.users
);

export const selectUserStatus = createSelector(
  selectUser,
  (state) => state.status
);

export const selectUserTotalPages = createSelector(
  selectUser,
  (state) => state.total_pages
);

export const selectUserError = createSelector(
  selectUser,
  (state) => state.error
);
