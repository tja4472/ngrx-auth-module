import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { DoSignUp, SignUp } from '@app/auth/actions/auth.actions';
import { SignIn } from '@app/auth/actions/sign-in-page.actions';

import { Authenticate } from '@app/auth/models/authentication.model';
import { State } from '@app/auth/reducers';
import { authQuery } from '@app/auth/selectors/auth.selectors';
import { signInPageQuery } from '@app/auth/selectors/sign-in-page.selectors';
import { signUpPageQuery } from '@app/auth/selectors/sign-up-page.selectors';


@Injectable()
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

  constructor(private store: Store<State>) {}

  public signInPageSignIn(credentials: Authenticate) {
    this.store.dispatch(new SignIn({ credentials }));
  }

  public signUp(credentials: Authenticate) {
    this.store.dispatch(new SignUp(credentials));
  }

  public showSignUpPage() {
    this.store.dispatch(new DoSignUp());
  }
}
