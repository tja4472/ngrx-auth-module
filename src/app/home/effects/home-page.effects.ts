import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromAuthActions from '../../auth/actions/auth.actions';
import * as fromHomePageActions from '../actions/home-page.actions';

import { map } from 'rxjs/operators';

@Injectable()
export class HomePageEffects {
  //
  @Effect()
  signOut$ = this.actions$.pipe(
    ofType<fromHomePageActions.SignOut>(
      fromHomePageActions.HomePageActionTypes.SignOut
    ),
    map(() => new fromAuthActions.SignOutConfirmationShow())
  );

  constructor(private actions$: Actions) {}
}
