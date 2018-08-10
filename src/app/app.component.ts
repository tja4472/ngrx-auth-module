import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { UserModel } from './auth/models/user.model';

import * as fromAuth from './auth/reducers';

import { authQuery } from '@app/auth/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list',
    },
  ];

  public user$: Observable<UserModel>;

  constructor(
    private platform: Platform,
    private store: Store<fromAuth.State>
  ) {
    // this.user$ = this.store.pipe(select(fromAuth.selectAuthUser));
    this.user$ = this.store.pipe(select(authQuery.selectAuthUser));
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {});
  }
}
