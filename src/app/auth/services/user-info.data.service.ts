import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { map } from 'rxjs/operators/map';
import { from, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

// tslint:disable-next-line:no-submodule-imports
import { AngularFirestore } from 'angularfire2/firestore';

import { newUserInfo, UserInfo } from '@app/auth/models/user-info.model';

import { environment } from 'environments/environment';

const APP_KEY = 'apps/' + environment.appCode;
const USERS_COLLECTION = APP_KEY + '/users';

interface FirestoreDoc {
  todoListId: string;
}

/*
@Injectable({
  providedIn: 'root',
})
*/
@Injectable()
export class UserInfoDataService {
  //
  constructor(public readonly afs: AngularFirestore) {
    console.log('UserInfoDataService:constructor');
  }

  public async getUserData(userId: string): Promise<UserInfo> {
    const userData = await this.getItem$(userId)
      .pipe(take(1))
      .toPromise();

    if (!!userData) {
      // Have userData.
      return userData;
    }

    // No userData.
    // This will happen after sign up.
    const defaultValue = newUserInfo();
    await this.save(defaultValue, userId);
    return defaultValue;
  }

  /*
  public getSingleItem$(userId: string) {
    const doc = this.getItem$(userId)
      .pipe(take(1))
      .toPromise()
      .then((value) => {
        if (!!value) {
          console.log('>> Have document');
          return value;
        } else {
          console.log('>> No document');
          // Document doesn't exist.
          // This will happen after sign up.
          const defaultValue = newUserData();
          this.save(defaultValue, userId);
          return defaultValue;
        }
      });

    return from(doc);
  }
  */

  public getItem$(userId: string): Observable<UserInfo | null> {
    //
    return this.firestoreDocument(userId)
      .valueChanges()
      .pipe(map((item) => this.fromFirestoreDoc(item)));
  }

  public save(item: UserInfo, userId: string): Promise<void> {
    const doc = this.toFirestoreDoc(item);
    console.log('>> Save>', doc);
    /*
    this.firestoreDocument(userId).valueChanges().pipe(take(1)).subscribe((x) => {
        console.log('KKKK>', x);
    });
    */
    return this.firestoreDocument(userId).set(doc);
  }

  private firestoreDocument(userId: string) {
    //
    return this.afs.collection(USERS_COLLECTION).doc<FirestoreDoc>(userId);
  }

  private toFirestoreDoc(item: UserInfo): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      todoListId: item.todoListId,
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc | null): UserInfo | null {
    //
    console.log('ZZZZZZZZZZZZZZZZZ>', x);

    if (x == null) {
      return null;
    }

    const result: UserInfo = {
      todoListId: x.todoListId,
    };

    return result;
  }
}
