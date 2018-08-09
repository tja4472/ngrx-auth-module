import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromRoot from '@app/reducers';

import * as fromAuth from '@auth/reducers/auth.reducer';
import * as fromLoginPage from '@auth/reducers/login-page.reducer';
import * as fromSignUpPage from '@auth/reducers/sign-up-page.reducer';

export interface AuthFeatureState {
  auth: fromAuth.State;
  loginPage: fromLoginPage.State;
  signUpPage: fromSignUpPage.State;
}

export interface State extends fromRoot.State {
  authFeature: AuthFeatureState;
}

export const reducers: ActionReducerMap<AuthFeatureState> = {
  auth: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
  signUpPage: fromSignUpPage.reducer,
};

export const selectAuthFeatureState = createFeatureSelector<
  State,
  AuthFeatureState
>('authFeature');

export const selectAuthState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.auth
);

export const selectHasChecked = createSelector(
  selectAuthState,
  fromAuth.selectHasChecked
);

export const selectAuthUser = createSelector(
  selectAuthState,
  fromAuth.selectUser
);
export const selectIsLoggedIn = createSelector(
  selectAuthUser,
  (user) => !!user
);

export const selectIsLoggedInChecked = createSelector(
  selectIsLoggedIn,
  selectHasChecked,
  (isLoggedIn: boolean, hasChecked: boolean) => {
    if (hasChecked) {
      return isLoggedIn;
    } else {
      return false;
    }
  }
);

// export const selectLoginPageState = createFeatureSelector<fromLoginPage.State>(
//   'loginPage',
// );
export const selectLoginPageState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.loginPage
);

export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.selectPending
);
export const selectLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.selectError
);
// ==
export const selectSignUpPageState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.signUpPage
);

export const selectSignUpPagePending = createSelector(
  selectSignUpPageState,
  fromSignUpPage.selectPending
);
export const selectSignUpPageError = createSelector(
  selectSignUpPageState,
  fromSignUpPage.selectError
);
