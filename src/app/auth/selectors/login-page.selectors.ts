import { createSelector } from '@ngrx/store';

import { AuthFeatureState, selectAuthFeatureState } from '@auth/reducers';
import { LoginPageState } from '@auth/reducers/login-page.reducer';

const selectLoginPageState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.loginPage
);

const selectLoginPageError = createSelector(
  selectLoginPageState,
  (state: LoginPageState) => state.error
);

const selectLoginPagePending = createSelector(
  selectLoginPageState,
  (state: LoginPageState) => state.pending
);

export const loginPageQuery = {
  selectLoginPageError,
  selectLoginPagePending,
};
