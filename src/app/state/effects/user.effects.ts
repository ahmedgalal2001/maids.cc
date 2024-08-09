import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import {
  loadUsers,
  loadUsersSuccess,
  loadUser,
  loadUserSuccess,
  loadUsersFailure,
  loadUserFailure,
} from '../actions/user.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap((action) => {
        return this.userService.getUsers(action.page).pipe(
          map((users) => {
            return loadUsersSuccess({ users: users.data , total_pages: users.total_pages , total: users.total });
          }),
          catchError((error) => {
            return of(loadUsersFailure({ error }));
          })
        );
      })
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      mergeMap((action) => {
        console.log('loadUser action:', action);
        return this.userService.getUserById(action.id).pipe(
          map((user) => {
            console.log('User data received:', user);
            return loadUserSuccess({ user: user.data });
          }),
          catchError((error) => {
            console.error('Error occurred:', error);
            return of(loadUserFailure({ error }));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
