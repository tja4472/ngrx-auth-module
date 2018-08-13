import { AuthActions, AuthActionTypes } from '@app/auth/actions/auth.actions';

export interface SignUpPageState {
  readonly pending: boolean;
  readonly error: string | null;
}

export const initialState: SignUpPageState = {
  pending: false,
  error: null,
};

export function signUpPageReducer(
  state = initialState,
  action: AuthActions
): SignUpPageState {
  switch (action.type) {
    case AuthActionTypes.SignUp: {
      return { ...state, pending: true };
    }

    case AuthActionTypes.LoginSuccess: {
      return initialState;
    }

    case AuthActionTypes.SignUpFailure: {
      return { ...state, error: action.payload, pending: false };
    }

    default: {
      return state;
    }
  }
}
