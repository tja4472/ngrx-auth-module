// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

import { Authenticate } from '@app/auth/models/authentication.model';
import { UserModel } from '@app/auth/models/user.model';

export enum AuthApiActionTypes {
  AutoSignIn = '[Auth/API] Auto Sign In',
  AutoSignInHaveUser = '[Auth/API] Auto Sign In - Have User',
  AutoSignInNoUser = '[Auth/API] Auto Sign In - No User',
  //
  ShowSignUpPage = '[Auth] Show Sign Up Page',
  //
  SignIn = '[Auth API] Sign In',
  SignInSuccess = '[Auth/API] Sign In - Success',
  SignInFailure = '[Auth/API] Sign In - Failure',
  //
  SignOut = '[Auth API] Sign Out',
  SignOutComplete = '[Auth API] Sign Out - Complete',
  //
  SignUp = '[Auth] Sign Up',
  SignUpFailure = '[Auth] Sign Up - Failure',
  SignUpSuccess = '[Auth] Sign Up - Success',
}

export class AutoSignIn implements Action {
  readonly type = AuthApiActionTypes.AutoSignIn;
}

export class AutoSignInHaveUser implements Action {
  readonly type = AuthApiActionTypes.AutoSignInHaveUser;

  constructor(public payload: { user: UserModel }) {}
}

export class AutoSignInNoUser implements Action {
  readonly type = AuthApiActionTypes.AutoSignInNoUser;
}

export class ShowSignUpPage implements Action {
  readonly type = AuthApiActionTypes.ShowSignUpPage;
}

export class SignIn implements Action {
  readonly type = AuthApiActionTypes.SignIn;

  constructor(public payload: { credentials: Authenticate }) {}
}

export class SignInSuccess implements Action {
  readonly type = AuthApiActionTypes.SignInSuccess;

  constructor(public payload: { user: UserModel }) {}
}

export class SignInFailure implements Action {
  readonly type = AuthApiActionTypes.SignInFailure;

  constructor(public payload: { error: any }) {}
}

export class SignOut implements Action {
  readonly type = AuthApiActionTypes.SignOut;
}

export class SignOutComplete implements Action {
  readonly type = AuthApiActionTypes.SignOutComplete;
}

export class SignUp implements Action {
  readonly type = AuthApiActionTypes.SignUp;

  constructor(public payload: { credentials: Authenticate }) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthApiActionTypes.SignUpFailure;

  constructor(public payload: { error: any }) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthApiActionTypes.SignUpSuccess;

  constructor(public payload: { user: UserModel }) {}
}

export type AuthApiActionsUnion =
  | AutoSignInHaveUser
  | AutoSignInNoUser
  | SignInSuccess
  | SignInFailure
  | SignIn
  | SignOut
  | SignOutComplete
  | SignUp
  | SignUpFailure
  | SignUpSuccess;
