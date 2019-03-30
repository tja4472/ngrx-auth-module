import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromHomePageActions from '@app/home/actions/home-page.actions';

import { map } from 'rxjs/operators';

import { SignOutConfirmationAlertActions } from '@app/auth/actions';

@Injectable()
export class HomePageEffects {
  //
  @Effect()
  signOut$ = this.actions$.pipe(
    ofType<fromHomePageActions.SignOut>(
      fromHomePageActions.HomePageActionTypes.SignOut
    ),
    map(() => SignOutConfirmationAlertActions.show())
  );

  constructor(private actions$: Actions) {}
}
