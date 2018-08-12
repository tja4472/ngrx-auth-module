import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromHomePageActions from '../actions/home-page.actions';

import { map } from 'rxjs/operators';

import { Show } from '@app/auth/actions/sign-out-confirmation-alert.actions';

@Injectable()
export class HomePageEffects {
  //
  @Effect()
  signOut$ = this.actions$.pipe(
    ofType<fromHomePageActions.SignOut>(
      fromHomePageActions.HomePageActionTypes.SignOut
    ),
    map(() => new Show())
  );

  constructor(private actions$: Actions) {}
}
