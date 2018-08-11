import { createSelector } from '@ngrx/store';

import { AuthFeatureState, selectAuthFeatureState } from '@app/auth/reducers';
import { LoginPageState } from '@app/auth/reducers/login-page.reducer';

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
