// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { Authenticate } from '../models/authentication.model';
import { UserModel } from '../models/user.model';

export enum SignOutConfirmationActionTypes {
  Cancel = '[Sign Out Confirmation] Cancel',
  Ok = '[Sign Out Confirmation] Ok',
  Show = '[Sign Out Confirmation] Show',
}

export enum AuthActionTypes {
  AutoLogin = '[Auth API] Auto Login',
  AutoLoginSignedOut = '[Auth API] Auto Login Signed Out',
  AutoLoginSuccess = '[Auth API] Auto Login Success',
  DoSignUp = '[Auth] Do Sign Up',
  Login = '[Login Page] Login',
  LoginSuccess = '[Auth API] Login Success',
  LoginFailure = '[Auth API] Login Failure',
  SignOut = '[Auth API] Sign Out',
  LogoutComplete = '[Auth API] Logout Complete',
  SignUp = '[Auth] Sign Up',
  SignUpFailure = '[Auth] Sign Up Failure',
}

export class AutoLogin implements Action {
  readonly type = AuthActionTypes.AutoLogin;
}

export class AutoLoginSignedOut implements Action {
  readonly type = AuthActionTypes.AutoLoginSignedOut;
}

export class AutoLoginSuccess implements Action {
  readonly type = AuthActionTypes.AutoLoginSuccess;

  constructor(readonly payload: { user: UserModel }) {}
}

export class DoSignUp implements Action {
  readonly type = AuthActionTypes.DoSignUp;
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
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
//
export class SignOutConfirmationCancelled implements Action {
  readonly type = SignOutConfirmationActionTypes.Cancel;
}

export class SignOutConfirmationAccepted implements Action {
  readonly type = SignOutConfirmationActionTypes.Ok;
}

export class SignOutConfirmationShow implements Action {
  readonly type = SignOutConfirmationActionTypes.Show;
}
//
export class LogoutComplete implements Action {
  readonly type = AuthActionTypes.LogoutComplete;
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
  | AutoLoginSignedOut
  | AutoLoginSuccess
  | Login
  | LoginSuccess
  | LoginFailure
  | SignOutConfirmationShow
  | SignOutConfirmationCancelled
  | SignOutConfirmationAccepted
  | LogoutComplete
  | SignOut
  | SignUp
  | SignUpFailure;
