import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loginPageQuery } from '@app/auth/selectors/login-page.selectors';
import { DoSignUp, Login } from '../../actions/auth.actions';
import { Authenticate } from '../../models/authentication.model';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'tja-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
})
export class SignInPageComponent implements OnInit {
  error$ = this.store.pipe(select(loginPageQuery.selectLoginPageError));
  pending$ = this.store.pipe(select(loginPageQuery.selectLoginPagePending));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onLogin(credentials: Authenticate) {
    this.store.dispatch(new Login(credentials));
  }

  onSignUp() {
    this.store.dispatch(new DoSignUp());
  }
}
