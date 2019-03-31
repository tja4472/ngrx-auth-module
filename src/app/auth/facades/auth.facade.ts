import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import {
  AuthApiActions,
  SignInPageActions,
  SignUpPageActions,
} from '@app/auth/actions';

import { Credentials } from '@app/auth/models/credentials.model';
import { State } from '@app/auth/reducers';
import { authQuery } from '@app/auth/selectors/auth.selectors';
import { signInPageQuery } from '@app/auth/selectors/sign-in-page.selectors';
import { signUpPageQuery } from '@app/auth/selectors/sign-up-page.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  public authUser$ = this.store.pipe(select(authQuery.selectAuthUser));

  public signInPageError$ = this.store.pipe(
    select(signInPageQuery.selectSignInPageError)
  );

  public signInPagePending$ = this.store.pipe(
    select(signInPageQuery.selectSignInPagePending)
  );

  public signUpPageError$ = this.store.pipe(
    select(signUpPageQuery.selectSignUpPageError)
  );

  public signUpPagePending$ = this.store.pipe(
    select(signUpPageQuery.selectSignUpPagePending)
  );

  constructor(private store: Store<{}>) {}

  public dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
