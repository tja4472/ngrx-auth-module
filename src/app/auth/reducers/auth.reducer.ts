import { AuthApiActionsUnion, AuthApiActionTypes } from '@app/auth/actions/auth-api.actions';
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
  action: AuthApiActionsUnion
): AuthState {
  switch (action.type) {
    case AuthApiActionTypes.AutoSignInNoUser:
      return { ...state, hasChecked: true };

    case AuthApiActionTypes.SignInSuccess:
    case AuthApiActionTypes.AutoSignInHaveUser:
    case AuthApiActionTypes.SignUpSuccess:
      return { ...state, hasChecked: true, user: action.payload.user };

    case AuthApiActionTypes.SignOut:
      return { ...initialState, hasChecked: true };

    default:
      return state;
  }
}
