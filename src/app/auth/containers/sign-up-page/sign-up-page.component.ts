import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { signUpPageQuery } from '@app/auth/selectors/sign-up-page.selectors';
import { SignUp } from '../../actions/auth.actions';
import { Authenticate } from '../../models/authentication.model';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'tja-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent implements OnInit {
  error$ = this.store.pipe(select(signUpPageQuery.selectSignUpPageError));
  pending$ = this.store.pipe(select(signUpPageQuery.selectSignUpPagePending));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onLogin(credentials: Authenticate) {
    this.store.dispatch(new SignUp(credentials));
  }
}
