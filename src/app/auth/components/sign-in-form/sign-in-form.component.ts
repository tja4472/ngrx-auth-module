import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Authenticate } from '../../models/authentication.model';

@Component({
  selector: 'tja-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
})
export class SignInFormComponent implements OnInit {
  @Input()
  error: string | null;

  @Input()
  set disabled(isDisabled: boolean) {
    if (isDisabled) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }

  @Output()
  SignUpClicked = new EventEmitter();
  @Output()
  submitted = new EventEmitter<Authenticate>();

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit() {}

  signUp() {
    this.SignUpClicked.emit();
  }

  onSubmit() {
    //
    const value: Authenticate = this.loginForm.value;

    if (this.loginForm.valid) {
      this.submitted.emit(value);
    }
  }
}
