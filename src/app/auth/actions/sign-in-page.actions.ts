import { createAction, props, union } from '@ngrx/store';

import { Credentials } from '@app/auth/models/credentials.model';

export const signIn = createAction(
  '[Sign In Page] Sign In',
  props<{ credentials: Credentials }>()
);

const all = union({
  signIn,
});

export type SignInPageActionsUnion = typeof all;
