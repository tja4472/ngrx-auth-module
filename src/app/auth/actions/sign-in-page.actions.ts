// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

import { Authenticate } from '@app/auth/models/authentication.model';
import { UserModel } from '@app/auth/models/user.model';

export enum SignInPageActionTypes {
  SignIn = '[Sign In Page] Sign In',
}

export class SignIn implements Action {
  readonly type = SignInPageActionTypes.SignIn;

  constructor(readonly payload: { credentials: Authenticate }) {}
}

export type SignInPageActionsUnion = SignIn;
