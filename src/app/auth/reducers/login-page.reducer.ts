import {
  SignInPageActions,
  SignInPageActionTypes,
} from '@app/auth/actions/sign-in-page.actions';

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
  action: SignInPageActions
): LoginPageState {
  switch (action.type) {
    case SignInPageActionTypes.SignIn: {
      return { ...state, pending: true };
    }

    case SignInPageActionTypes.SignInSuccess: {
      return initialState;
    }

    case SignInPageActionTypes.SignInFailure: {
      return { ...state, error: action.payload.error, pending: false };
    }

    default: {
      return state;
    }
  }
}
