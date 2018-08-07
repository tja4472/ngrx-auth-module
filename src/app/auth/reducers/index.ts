import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';
import * as fromSignUpPage from './sign-up-page.reducer';

export interface AuthFeatureState {
  auth: fromAuth.State;
  loginPage: fromLoginPage.State;
  signUpPage: fromSignUpPage.State;
}

// export interface State extends fromRoot.State {
// tslint:disable-next-line:no-empty-interface
export interface State {
  // auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AuthFeatureState> = {
  auth: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
  signUpPage: fromSignUpPage.reducer,
};

// tslint:disable-next-line:array-type
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectAuthFeatureState = createFeatureSelector<AuthFeatureState>(
  'auth-feature'
);

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
