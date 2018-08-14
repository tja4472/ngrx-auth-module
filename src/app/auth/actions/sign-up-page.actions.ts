// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

import { Authenticate } from '@app/auth/models/authentication.model';
import { UserModel } from '@app/auth/models/user.model';

export enum SignUpPageActionTypes {
  SignUp = '[Sign Up Page] Sign Up',
  SignUpFailure = '[Sign Up Page] Sign Up - Failure',
  SignUpSuccess = '[Sign Up Page] Sign Up - Success',
}

export class SignUp implements Action {
  readonly type = SignUpPageActionTypes.SignUp;

  constructor(readonly payload: { credentials: Authenticate }) {}
}

export class SignUpFailure implements Action {
  readonly type = SignUpPageActionTypes.SignUpFailure;

  constructor(readonly payload: { error: any }) {}
}

export class SignUpSuccess implements Action {
  readonly type = SignUpPageActionTypes.SignUpSuccess;

  constructor(readonly payload: { user: UserModel }) {}
}

export type SignUpPageActions = SignUp | SignUpFailure | SignUpSuccess;