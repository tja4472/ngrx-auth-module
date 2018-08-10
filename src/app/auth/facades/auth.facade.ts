import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { DoSignUp, Login, SignUp } from '@auth/actions/auth.actions';
import { Authenticate } from '@auth/models/authentication.model';
import { State } from '@auth/reducers';
import { authQuery } from '@auth/selectors/auth.selectors';
import { loginPageQuery } from '@auth/selectors/login-page.selectors';
import { signUpPageQuery } from '@auth/selectors/sign-up-page.selectors';

@Injectable()
export class AuthFacade {
  public authUser$ = this.store.pipe(select(authQuery.selectAuthUser));

  public signInPageError$ = this.store.pipe(
    select(loginPageQuery.selectLoginPageError)
  );

  public signInPagePending$ = this.store.pipe(
    select(loginPageQuery.selectLoginPagePending)
  );

  public signUpPageError$ = this.store.pipe(
    select(signUpPageQuery.selectSignUpPageError)
  );

  public signUpPagePending$ = this.store.pipe(
    select(signUpPageQuery.selectSignUpPagePending)
  );

  constructor(private store: Store<State>) {}

  public signIn(credentials: Authenticate) {
    this.store.dispatch(new Login(credentials));
  }

  public signUp(credentials: Authenticate) {
    this.store.dispatch(new SignUp(credentials));
  }

  public showSignUpPage() {
    this.store.dispatch(new DoSignUp());
  }
}
