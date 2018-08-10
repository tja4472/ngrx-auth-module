import { createSelector } from '@ngrx/store';

import { AuthFeatureState, selectAuthFeatureState } from '@auth/reducers';
import { SignUpPageState } from '@auth/reducers/sign-up-page.reducer';

const selectSignUpPageState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.signUpPage
);

const selectSignUpPageError = createSelector(
  selectSignUpPageState,
  (state: SignUpPageState) => state.error
);

const selectSignUpPagePending = createSelector(
  selectSignUpPageState,
  (state: SignUpPageState) => state.pending
);

export const signUpPageQuery = {
  selectSignUpPageError,
  selectSignUpPagePending,
};
