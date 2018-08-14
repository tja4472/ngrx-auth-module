import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, from, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import {
  AuthActionTypes,
  AutoSignIn,
  AutoSignInHaveUser,
  AutoSignInNoUser,
  ShowSignUpPage,
  SignIn,
  SignInFailure,
  SignInSuccess,
  SignOut,
  SignOutComplete,
  SignUp,
  SignUpFailure,
  SignUpSuccess,
} from '@app/auth/actions/auth.actions';

// tslint:disable:no-duplicate-imports
import * as fromSignInPageActions from '@app/auth/actions/sign-in-page.actions';
import { SignInPageActionTypes } from '@app/auth/actions/sign-in-page.actions';
// tslint:enable:no-duplicate-imports

// tslint:disable:no-duplicate-imports
import * as fromSignUpPageActions from '@app/auth/actions/sign-up-page.actions';
import { SignUpPageActionTypes } from '@app/auth/actions/sign-up-page.actions';
// tslint:enable:no-duplicate-imports

// tslint:disable:no-duplicate-imports
import * as fromSignOutConfirmationAlertActions from '@app/auth/actions/sign-out-confirmation-alert.actions';
import { SignOutConfirmationAlertActionTypes } from '@app/auth/actions/sign-out-confirmation-alert.actions';
// tslint:enable:no-duplicate-imports

import { AuthService } from '@app/auth/services/auth.service';
import { SignOutConfirmationAlertService } from '@app/auth/services/sign-out-confirmation-alert.service';

@Injectable()
export class AuthEffects {
  @Effect()
  autoSignIn$ = this.actions$.pipe(
    ofType<AutoSignIn>(AuthActionTypes.AutoSignIn),
    exhaustMap(() =>
      this.authService.autoSignIn().pipe(
        map((user) => {
          if (!!user) {
            return new AutoSignInHaveUser({ user });
          } else {
            return new AutoSignInNoUser();
          }
        })
      )
    )
  );

  @Effect({ dispatch: false })
  doSignUp$ = this.actions$.pipe(
    ofType<ShowSignUpPage>(AuthActionTypes.ShowSignUpPage),
    tap(() => {
      this.router.navigate(['/sign-up']);
    })
  );

  /*    
  @Effect({ dispatch: false })
  signUp$ = this.actions$
    .ofType<SignUp>(AuthActionTypes.SignUp)
    .pipe(
      map((action) => action.payload),
      tap((auth) => {
        this.authService.signUp(auth);
      })
    );
  */

  @Effect()
  authSignIn$ = this.actions$.pipe(
    ofType<SignIn>(AuthActionTypes.SignIn),
    map((action) => action.payload),
    exhaustMap((payload) =>
      this.authService.login(payload.credentials).pipe(
        map((user) => new SignInSuccess({ user })),
        catchError((error) => of(new SignInFailure(error)))
      )
    )
  );

  @Effect()
  authSignUp$ = this.actions$.pipe(
    ofType<SignUp>(AuthActionTypes.SignUp),
    map((action) => action.payload),
    exhaustMap((payload) =>
      this.authService.signUp(payload.credentials).pipe(
        map((user) => new SignUpSuccess({ user })),
        catchError((error) => of(new SignUpFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  authSignInSuccess$ = this.actions$.pipe(
    ofType<SignInSuccess | SignUpSuccess>(
      AuthActionTypes.SignInSuccess,
      AuthActionTypes.SignUpSuccess
    ),
    tap(() => {
      if (this.authService.redirectUrl === '') {
        this.router.navigate(['/']);
      } else {
        this.router.navigate([this.authService.redirectUrl]);
      }
    })
  );

  @Effect()
  signInPageSignIn$ = this.actions$.pipe(
    ofType<fromSignInPageActions.SignIn>(SignInPageActionTypes.SignIn),
    map(({ payload }) => new SignIn(payload))
  );

  @Effect()
  signInPageSignInFailure$ = this.actions$.pipe(
    ofType<SignInFailure>(AuthActionTypes.SignInFailure),
    map(
      ({ payload }) =>
        new fromSignInPageActions.SignInFailure({ error: payload })
    )
  );

  @Effect()
  signInPageSignInSuccess$ = this.actions$.pipe(
    ofType<SignInSuccess>(AuthActionTypes.SignInSuccess),
    map(
      ({ payload }) =>
        new fromSignInPageActions.SignInSuccess({ user: payload.user })
    )
  );

  @Effect()
  signUpPageSignUp$ = this.actions$.pipe(
    ofType<fromSignUpPageActions.SignUp>(SignUpPageActionTypes.SignUp),
    map(({ payload }) => new SignUp(payload))
  );

  @Effect()
  signUpPageSignUpFailure$ = this.actions$.pipe(
    ofType<SignUpFailure>(AuthActionTypes.SignUpFailure),
    map(
      ({ payload }) =>
        new fromSignUpPageActions.SignUpFailure({ error: payload })
    )
  );

  @Effect()
  signUpPageSignUpSuccess$ = this.actions$.pipe(
    ofType<SignUpSuccess>(AuthActionTypes.SignUpSuccess),
    map(
      ({ payload }) =>
        new fromSignUpPageActions.SignUpSuccess({ user: payload.user })
    )
  );

  /*
  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(() => {
      // this.router.navigate(['/books']);
      if (this.authService.redirectUrl === '') {
        console.log('MMMMMMMMMMMM');
        this.router.navigate(['/']);
      } else {
        this.router.navigate([this.authService.redirectUrl]);
      }
    })
  );
*/

  /*
  @Effect()
  signOutConfirmation$ = this.actions$.pipe(
    ofType<SignOutConfirmationShow>(SignOutConfirmationActionTypes.Show),
    exhaustMap(() =>
      from(this.showSignOutPrompt()).pipe(
        map((confirmed) => {
          if (confirmed) {
            return new SignOutConfirmationOk();
          } else {
            return new SignOutConfirmationCancel();
          }
        })
      )
    )
  );
  */

  /*
    @Effect({ dispatch: false })
    logoutConfirmation$ = this.actions$
      .ofType<Logout>(AuthActionTypes.Logout)
      .pipe(
        tap(() => {
          console.log('### sign out ###');
          // this.showSignOutPrompt();
          this.showSignOutPrompt().then(() => {
           console.log('aaaaaa');
         });
        })
      );
    */

  /*
  @Effect()
  logoutConfirmation$ = this.actions$
    .ofType<Logout>(AuthActionTypes.Logout)
    .pipe(
      exhaustMap(() =>
        this.dialogService
          .open(LogoutPromptComponent)
          .afterClosed()
          .pipe(
            map((confirmed) => {
              if (confirmed) {
                return new LogoutConfirmed();
              } else {
                return new LogoutCancelled();
              }
            }),
          ),
      ),
    );
  */

  @Effect()
  signOut$ = this.actions$.pipe(
    ofType<SignOut>(AuthActionTypes.SignOut),
    exhaustMap(() =>
      this.authService.signOut().pipe(
        tap(() => this.router.navigate(['/sign-in'])),
        map(() => new SignOutComplete())
        // catchError(() => of(new SignOutComplete()))
      )
    )
  );

  // ==
  // SignOutConfirmationAlert
  // ==
  @Effect({ dispatch: false })
  signOutConfirmationAlertShow$ = this.actions$.pipe(
    ofType<fromSignOutConfirmationAlertActions.Show>(
      SignOutConfirmationAlertActionTypes.Show
    ),
    tap(() => this.signOutConfirmationAlertService.show())
  );

  @Effect()
  signOutConfirmationAccepted$ = this.actions$.pipe(
    ofType<fromSignOutConfirmationAlertActions.Accepted>(
      SignOutConfirmationAlertActionTypes.Accepted
    ),
    map(() => new SignOut())
  );
  // ==
  /*
  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType<SignOutConfirmationOk>(AuthActionTypes.SignOutConfirmationOk)
    .pipe(
      exhaustMap((auth) =>
        this.authService.logout().pipe(
          tap(() => this.router.navigate(['/sign-in'])),
          map(() => new LogoutComplete()),
          catchError(() => of(new LogoutComplete()))
        )
      )
    );
*/

  @Effect()
  init$: Observable<any> = defer(() => of(null)).pipe(
    map(() => new AutoSignIn())
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private signOutConfirmationAlertService: SignOutConfirmationAlertService
  ) {}
}
