import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  selectOnlyUser,
  selectUserStatus,
} from '../../state/selectors/user.selector';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { loadUser } from '../../state/actions/user.action';
import { User } from '../../state/reducers/user.reducer';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  standalone: true,
  styleUrl: './user-details.component.css',
  imports: [CommonModule , MatProgressSpinnerModule],
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<User | null> = this.store.pipe(select(selectOnlyUser));
  loading$: Observable<boolean> = this.store.pipe(
    select(selectUserStatus),
    map((status) => status === 'loading')
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.store.dispatch(loadUser({ id: Number(userId) }));
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
