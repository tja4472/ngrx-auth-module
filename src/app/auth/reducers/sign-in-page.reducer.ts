import {
  AuthApiActionsUnion,
  AuthApiActionTypes,
} from '@app/auth/actions/auth-api.actions';
import {
  SignInPageActionsUnion,
  SignInPageActionTypes,
} from '@app/auth/actions/sign-in-page.actions';

export interface SignInPageState {
  pending: boolean;
  error: string | null;
}

export const initialState: SignInPageState = {
  error: null,
  pending: false,
};

export function signInPageReducer(
  state = initialState,
  action: AuthApiActionsUnion | SignInPageActionsUnion
): SignInPageState {
  switch (action.type) {
    case SignInPageActionTypes.SignIn: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthApiActionTypes.SignInSuccess: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthApiActionTypes.SignInFailure: {
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
