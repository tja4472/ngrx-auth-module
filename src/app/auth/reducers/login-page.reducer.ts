import { AuthActions, AuthActionTypes } from '@app/auth/actions/auth.actions';

export interface LoginPageState {
  pending: boolean;
  error: string | null;
}

export const initialState: LoginPageState = {
  pending: false,
  error: null,
};

export function loginPageReducer(
  state = initialState,
  action: AuthActions
): LoginPageState {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return { ...state, pending: true };
    }

    case AuthActionTypes.LoginSuccess: {
      return initialState;
    }

    case AuthActionTypes.LoginFailure: {
      return { ...state, error: action.payload, pending: false };
    }

    default: {
      return state;
    }
  }
}
