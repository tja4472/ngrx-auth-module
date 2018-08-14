import { Component, OnInit } from '@angular/core';

import { AuthFacade } from '@app/auth/facades/auth.facade';
import { Authenticate } from '@app/auth/models/authentication.model';

@Component({
  selector: 'tja-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent implements OnInit {
  error$ = this.authFacade.signUpPageError$;
  pending$ = this.authFacade.signUpPagePending$;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {}

  onSubmitted(credentials: Authenticate) {
    this.authFacade.signUpPageSignUp(credentials);
  }
}
