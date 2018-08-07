import { Injectable } from '@angular/core';

// tslint:disable-next-line:no-submodule-imports
import { AngularFireAuth } from 'angularfire2/auth';

import { from, merge, Observable } from 'rxjs';
import {
  exhaustMap,
  filter,
  map,
  share,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { UserModel } from '../models/user.model';

import { Authenticate } from '../models/authentication.model';
import { UserInfoDataService } from './user-info.data.service';

/*
@Injectable({
  providedIn: 'root',
})
*/
@Injectable()
export class AuthService {
  public redirectUrl = '';

  private signedIn$: Observable<UserModel>;
  private signedInSignedOut$: Observable<UserModel>;
  private signedOut$: Observable<UserModel>;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly userDataService: UserInfoDataService
  ) {
    const firebaseAuth$ = this.afAuth.authState.pipe(
      // tap(() => console.log('***SIDE EFFECT***')),
      share()
    );

    this.signedIn$ = firebaseAuth$.pipe(
      filter((firebaseUser) => !!firebaseUser),
      exhaustMap((firebaseUser) =>
        from(this.userDataService.getUserData(firebaseUser.uid)).pipe(
          map((userData) => ({ firebaseUser, userData })),
          map((x) => {
            const user: UserModel = {
              id: x.firebaseUser.uid,
              email: x.firebaseUser.email,
              name: x.firebaseUser.displayName,
              todoListId: x.userData.todoListId,
            };

            return user;
          })
        )
      )
    );

    this.signedOut$ = firebaseAuth$.pipe(
      filter((firebaseUser) => !!!firebaseUser),
      map(() => null)
    );

    this.signedInSignedOut$ = merge(this.signedIn$, this.signedOut$);
  }

  public autoLogin(): Observable<UserModel> {
    //
    return this.signedInSignedOut$.pipe(take(1));
  }

  public login(auth: Authenticate): Observable<UserModel> {
    //
    const result$ = from(
      this.afAuth.auth.signInWithEmailAndPassword(auth.username, auth.password)
    ).pipe(
      switchMap(() => {
        return this.signedIn$.pipe(take(1));
      })
    );

    return result$;
  }

  public logout(): Observable<boolean> {
    //
    const result$ = from(this.afAuth.auth.signOut()).pipe(
      switchMap(() => {
        return this.signedOut$.pipe(take(1), map(() => true));
      })
    );

    return result$;
  }

  public signUp(auth: Authenticate) {
    //
    const result$ = from(
      this.afAuth.auth.createUserWithEmailAndPassword(
        auth.username,
        auth.password
      )
    ).pipe(
      switchMap(() => {
        return this.signedIn$.pipe(take(1));
      })
    );

    return result$;
  }
}
