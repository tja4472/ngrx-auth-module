import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { SignOutConfirmationAlertActions } from '@app/auth/actions';

@Injectable({
  providedIn: 'root',
})
export class SignOutConfirmationAlertFacade {
  constructor(private store: Store<{}>) {}

  public Accepted() {
    this.store.dispatch(SignOutConfirmationAlertActions.accepted());
  }

  public Cancelled() {
    this.store.dispatch(SignOutConfirmationAlertActions.cancelled());
  }

  public Show() {
    this.store.dispatch(SignOutConfirmationAlertActions.show());
  }
}
