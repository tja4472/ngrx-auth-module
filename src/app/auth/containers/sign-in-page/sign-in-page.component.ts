import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DoSignUp, Login } from '../../actions/auth.actions';
import { Authenticate } from '../../models/authentication.model';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'tja-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
})
export class SignInPageComponent implements OnInit {
  error$ = this.store.select(fromAuth.selectLoginPageError);
  pending$ = this.store.select(fromAuth.selectLoginPagePending);
  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onLogin(credentials: Authenticate) {
    this.store.dispatch(new Login(credentials));
  }

  onSignUp() {
    this.store.dispatch(new DoSignUp());
  }
}
