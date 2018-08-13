import { createSelector } from '@ngrx/store';

import { AuthFeatureState, selectAuthFeatureState } from '@app/auth/reducers';
import { LoginPageState } from '@app/auth/reducers/login-page.reducer';

const selectSignInPageState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.loginPage
);

const selectSignInPageError = createSelector(
  selectSignInPageState,
  (state: LoginPageState) => state.error
);

const selectSignInPagePending = createSelector(
  selectSignInPageState,
  (state: LoginPageState) => state.pending
);

export const signInPageQuery = {
  selectSignInPageError,
  selectSignInPagePending,
};
