import { Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

// import { LogoutPromptComponent } from '@app/auth/components/logout-prompt.component';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, from, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import {
  AuthActionTypes,
  AutoLogin,
  AutoLoginSignedOut,
  AutoLoginSuccess,
  DoSignUp,
  Login,
  LoginFailure,
  LoginSuccess,
  LogoutComplete,
  SignOut,
  SignOutConfirmationActionTypes,
  SignOutConfirmationCancel,
  SignOutConfirmationOk,
  SignOutConfirmationShow,
  SignUp,
  SignUpFailure,
} from '../actions/auth.actions';

import { AlertController } from '@ionic/angular';
// tslint:disable-next-line:no-implicit-dependencies
import { AlertOptions } from '@ionic/core';

@Injectable()
export class AuthEffects {
  @Effect()
  autoLogin$ = this.actions$.ofType<AutoLogin>(AuthActionTypes.AutoLogin).pipe(
    exhaustMap(() =>
      this.authService.autoLogin().pipe(
        map((user) => {
          if (!!user) {
            return new AutoLoginSuccess({ user });
          } else {
            return new AutoLoginSignedOut();
          }
        })
      )
    )
  );

  @Effect({ dispatch: false })
  doSignUp$ = this.actions$.ofType<DoSignUp>(AuthActionTypes.DoSignUp).pipe(
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
  signUp$ = this.actions$.ofType<SignUp>(AuthActionTypes.SignUp).pipe(
    map((action) => action.payload),
    exhaustMap((auth) =>
      this.authService.signUp(auth).pipe(
        map((user) => new LoginSuccess({ user })),
        catchError((error) => of(new SignUpFailure(error)))
      )
    )
  );

  @Effect()
  login$ = this.actions$.ofType<Login>(AuthActionTypes.Login).pipe(
    map((action) => action.payload),
    exhaustMap((auth) =>
      this.authService.login(auth).pipe(
        map((user) => new LoginSuccess({ user })),
        catchError((error) => of(new LoginFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType<LoginSuccess>(AuthActionTypes.LoginSuccess)
    .pipe(
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
  signOut$ = this.actions$
    .ofType<SignOutConfirmationOk>(AuthActionTypes.SignOut)
    .pipe(
      exhaustMap((auth) =>
        this.authService.logout().pipe(
          tap(() => this.router.navigate(['/sign-in'])),
          map(() => new LogoutComplete()),
          catchError(() => of(new LogoutComplete()))
        )
      )
    );

  @Effect()
  signOutConfirmationOk$ = this.actions$.pipe(
    ofType<SignOutConfirmationOk>(SignOutConfirmationActionTypes.Ok),
    map(() => new SignOut())
  );

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
    map(() => new AutoLogin())
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    // private dialogService: MatDialog,
    public alertCtrl: AlertController
  ) {}

  async showSignOutPrompt() {
    return new Promise<boolean>(async (resolve) => {
      const options: AlertOptions = {
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Cancel============');
              resolve(false);
            },
          },
          {
            text: 'Ok',
            handler: () => {
              console.log('OK============');
              resolve(true);
            },
          },
        ],
        header: 'Sign Out',
        enableBackdropDismiss: false,
        message: 'Are you sure you want to sign out?',
      };
      const alert = await this.alertCtrl.create(options);
      await alert.present();
    });
  }
}
