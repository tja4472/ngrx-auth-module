import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { UserModel } from '../models/user.model';
// import { Action } from '@ngrx/store';

export interface State
  extends Readonly<{
      hasChecked: boolean;
      user: UserModel | null;
    }> {}

export const initialState: State = {
  hasChecked: false,
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.AutoLoginSignedOut:
      return { ...state, hasChecked: true };

    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.AutoLoginSuccess:
      return { ...state, hasChecked: true, user: action.payload.user };

    case AuthActionTypes.SignOut:
      return { ...initialState, hasChecked: true };

    default:
      return state;
  }
}

export const selectHasChecked = (state: State) => state.hasChecked;
export const selectUser = (state: State) => state.user;
