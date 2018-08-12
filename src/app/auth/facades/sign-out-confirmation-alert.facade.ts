import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromSignOutConfirmationAlertActions from '@app/auth/actions/sign-out-confirmation-alert.actions';

import { State } from '@app/auth/reducers';

@Injectable()
export class SignOutConfirmationAlertFacade {
  constructor(private store: Store<State>) {}

  public Accepted() {
    this.store.dispatch(new fromSignOutConfirmationAlertActions.Accepted());
  }

  public Cancelled() {
    this.store.dispatch(
      new fromSignOutConfirmationAlertActions.Cancelled()
    );
  }

  public Show() {
    this.store.dispatch(
      new fromSignOutConfirmationAlertActions.Show()
    );
  }
}
