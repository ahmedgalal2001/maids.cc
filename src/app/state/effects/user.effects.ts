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
        console.log('loadUsers action:', action); // Debugging statement
        return this.userService.getUsers(action.page).pipe(
          map((users) => {
            console.log('Users data received:', users); // Debugging statement
            return loadUsersSuccess({ users: users.data , total_pages: users.total_pages });
          }),
          catchError((error) => {
            console.error('Error occurred:', error); // Debugging statement
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
        console.log('loadUser action:', action); // Debugging statement
        return this.userService.getUserById(action.id).pipe(
          map((user) => {
            console.log('User data received:', user); // Debugging statement
            return loadUserSuccess({ user: user.data });
          }),
          catchError((error) => {
            console.error('Error occurred:', error); // Debugging statement
            return of(loadUserFailure({ error }));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
