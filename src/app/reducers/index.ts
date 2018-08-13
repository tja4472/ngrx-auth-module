import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import { environment } from 'environments/environment';

import { storeFreeze } from 'ngrx-store-freeze';

export interface State {
  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  // tslint:disable-next-line:only-arrow-functions
  return function(state: State, action: any): State {
    // console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: Array<MetaReducer<State>> = !environment.production
  ? [logger, storeFreeze]
  : [];
