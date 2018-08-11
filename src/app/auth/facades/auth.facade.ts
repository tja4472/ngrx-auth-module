import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { DoSignUp, Login, SignUp } from '@app/auth/actions/auth.actions';
import { Authenticate } from '@app/auth/models/authentication.model';
import { State } from '@app/auth/reducers';
import { authQuery } from '@app/auth/selectors/auth.selectors';
import { loginPageQuery } from '@app/auth/selectors/login-page.selectors';
import { signUpPageQuery } from '@app/auth/selectors/sign-up-page.selectors';

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
