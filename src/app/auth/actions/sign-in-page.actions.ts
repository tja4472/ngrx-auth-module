// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

import { Authenticate } from '@app/auth/models/authentication.model';
import { UserModel } from '@app/auth/models/user.model';

export enum SignInPageActionTypes {
  SignIn = '[Sign In Page] Sign In',
  SignInFailure = '[Sign In Page] Sign In - Failure',
  SignInSuccess = '[Sign In Page] Sign In - Success',
}

export class SignIn implements Action {
  readonly type = SignInPageActionTypes.SignIn;

  constructor(readonly payload: { credentials: Authenticate }) {}
}

export class SignInFailure implements Action {
  readonly type = SignInPageActionTypes.SignInFailure;

  constructor(readonly payload: { error: any }) {}
}

export class SignInSuccess implements Action {
  readonly type = SignInPageActionTypes.SignInSuccess;

  constructor(readonly payload: { user: UserModel }) {}
}

export type SignInPageActions = SignIn | SignInFailure | SignInSuccess;
