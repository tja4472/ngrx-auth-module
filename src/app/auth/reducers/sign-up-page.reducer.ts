import {
  AuthApiActionsUnion,
  AuthApiActionTypes,
} from '@app/auth/actions/auth-api.actions';
import {
  SignUpPageActionsUnion,
  SignUpPageActionTypes,
} from '@app/auth/actions/sign-up-page.actions';

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
  action: AuthApiActionsUnion | SignUpPageActionsUnion
): SignUpPageState {
  switch (action.type) {
    case SignUpPageActionTypes.SignUp: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthApiActionTypes.SignUpSuccess: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthApiActionTypes.SignUpFailure: {
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}
