import { AuthActions, AuthActionTypes } from '@app/auth/actions/auth.actions';
import { UserModel } from '@app/auth/models/user.model';

export interface AuthState
  extends Readonly<{
      hasChecked: boolean;
      user: UserModel | null;
    }> {}

export const initialState: AuthState = {
  hasChecked: false,
  user: null,
};

export function authReducer(
  state = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.AutoSignInNoUser:
      return { ...state, hasChecked: true };

    case AuthActionTypes.SignInSuccess:
    case AuthActionTypes.AutoSignInHaveUser:
    case AuthActionTypes.SignUpSuccess:
      return { ...state, hasChecked: true, user: action.payload.user };

    case AuthActionTypes.SignOut:
      return { ...initialState, hasChecked: true };

    default:
      return state;
  }
}
