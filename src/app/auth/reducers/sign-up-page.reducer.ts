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
  action: SignUpPageActionsUnion
): SignUpPageState {
  switch (action.type) {
    case SignUpPageActionTypes.SignUp: {
      return { ...state, pending: true };
    }

    case SignUpPageActionTypes.SignUpSuccess: {
      return initialState;
    }

    case SignUpPageActionTypes.SignUpFailure: {
      return { ...state, error: action.payload.error, pending: false };
    }

    default: {
      return state;
    }
  }
}
