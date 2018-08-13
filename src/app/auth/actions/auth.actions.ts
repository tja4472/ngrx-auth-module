// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { Authenticate } from '../models/authentication.model';
import { UserModel } from '../models/user.model';

export enum AuthActionTypes {
  AutoSignIn = '[Auth API] Auto Sign In',
  AutoSignInHaveUser = '[Auth API] Auto Sign In - Have User',
  AutoSignInNoUser = '[Auth API] Auto Sign In - No User',
  //
  DoSignUp = '[Auth] Do Sign Up',
  Login = '[Login Page] Login',
  LoginSuccess = '[Auth API] Login - Success',
  LoginFailure = '[Auth API] Login - Failure',
  SignOut = '[Auth API] Sign Out',
  SignOutComplete = '[Auth API] Sign Out - Complete',
  SignUp = '[Auth] Sign Up',
  SignUpFailure = '[Auth] Sign Up - Failure',
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

export class DoSignUp implements Action {
  readonly type = AuthActionTypes.DoSignUp;
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: { credentials: Authenticate }) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: UserModel }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class SignOut implements Action {
  readonly type = AuthActionTypes.SignOut;
}

export class SignOutComplete implements Action {
  readonly type = AuthActionTypes.SignOutComplete;
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SignUp;

  constructor(public payload: Authenticate) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SignUpFailure;

  constructor(public payload: any) {}
}

export type AuthActions =
  | AutoSignInHaveUser
  | AutoSignInNoUser
  | Login
  | LoginSuccess
  | LoginFailure
  | SignOut
  | SignOutComplete
  | SignUp
  | SignUpFailure;
