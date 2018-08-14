// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

import { Authenticate } from '@app/auth/models/authentication.model';
import { UserModel } from '@app/auth/models/user.model';

export enum AuthActionTypes {
  AutoSignIn = '[Auth API] Auto Sign In',
  AutoSignInHaveUser = '[Auth API] Auto Sign In - Have User',
  AutoSignInNoUser = '[Auth API] Auto Sign In - No User',
  //
  ShowSignUpPage = '[Auth] Show Sign Up Page',
  //
  SignIn = '[Auth API] Sign In',
  SignInSuccess = '[Auth API] Sign In - Success',
  SignInFailure = '[Auth API] Sign In - Failure',
  //
  SignOut = '[Auth API] Sign Out',
  SignOutComplete = '[Auth API] Sign Out - Complete',
  //
  SignUp = '[Auth] Sign Up',
  SignUpFailure = '[Auth] Sign Up - Failure',
  SignUpSuccess = '[Auth] Sign Up - Success',
}

export class AutoSignIn implements Action {
  readonly type = AuthActionTypes.AutoSignIn;
}

export class AutoSignInHaveUser implements Action {
  readonly type = AuthActionTypes.AutoSignInHaveUser;

  constructor(readonly payload: { user: UserModel }) {}
}

export class AutoSignInNoUser implements Action {
  readonly type = AuthActionTypes.AutoSignInNoUser;
}

export class ShowSignUpPage implements Action {
  readonly type = AuthActionTypes.ShowSignUpPage;
}

export class SignIn implements Action {
  readonly type = AuthActionTypes.SignIn;

  constructor(readonly payload: { credentials: Authenticate }) {}
}

export class SignInSuccess implements Action {
  readonly type = AuthActionTypes.SignInSuccess;

  constructor(readonly payload: { user: UserModel }) {}
}

export class SignInFailure implements Action {
  readonly type = AuthActionTypes.SignInFailure;

  constructor(readonly payload: { error: any }) {}
}

export class SignOut implements Action {
  readonly type = AuthActionTypes.SignOut;
}

export class SignOutComplete implements Action {
  readonly type = AuthActionTypes.SignOutComplete;
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SignUp;

  constructor(readonly payload: { credentials: Authenticate }) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SignUpFailure;

  constructor(readonly payload: { error: any }) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SignUpSuccess;

  constructor(readonly payload: { user: UserModel }) {}
}

export type AuthActions =
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
