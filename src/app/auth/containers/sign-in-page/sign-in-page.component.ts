import { Component, OnInit } from '@angular/core';

import { AuthFacade } from '@app/auth/facades/auth.facade';
import { Authenticate } from '@app/auth/models/authentication.model';

@Component({
  selector: 'tja-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
})
export class SignInPageComponent implements OnInit {
  error$ = this.authFacade.signInPageError$;
  pending$ = this.authFacade.signInPagePending$;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {}

  onSubmitted(credentials: Authenticate) {
    this.authFacade.signInPageSignIn(credentials);
  }

  onSignUp() {
    this.authFacade.showSignUpPage();
  }
}
