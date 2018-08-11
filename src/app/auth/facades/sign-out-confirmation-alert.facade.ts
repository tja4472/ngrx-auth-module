import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import {
  SignOutConfirmationAccepted,
  SignOutConfirmationCancelled,
} from '@app/auth/actions/auth.actions';
import { State } from '@app/auth/reducers';

@Injectable()
export class SignOutConfirmationAlertFacade {
  constructor(private store: Store<State>) {}

  public Cancelled() {
    this.store.dispatch(new SignOutConfirmationCancelled());
  }

  public Accepted() {
    this.store.dispatch(new SignOutConfirmationAccepted());
  }
}
